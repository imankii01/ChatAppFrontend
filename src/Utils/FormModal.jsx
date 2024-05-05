import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Steps,
  message,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
import DynamicUploadComponent from "../Components/Upload";

const { Option } = Select;
const { Step } = Steps;

const FormModal = ({ onCreate, initialValues, onUpdate, steps }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = async (values) => {
    try {
      let data = form.getFieldValue();
      if (initialValues) {
        await onUpdate(data);
      } else {
        await onCreate(data);
      }
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      message.error("Failed to add/update client");
    }
  };
  const handleNext = async () => {
    try {
      const currentFields = steps[currentStep].fields?.map(
        (field) => field.name
      );
      await form.validateFields(currentFields);
      if (currentStep === 0 || currentStep === 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onFinish();
      }
    } catch (error) {
      message.error("Please fill all the required fields");
    }
  };

  return (
    <div className="container py-10">
      <FormMain
        currentStep={currentStep}
        steps={steps}
        form={form}
        onFinish={onFinish}
        setCurrentStep={setCurrentStep}
        handleNext={handleNext}
      />
    </div>
  );
};

export default FormModal;

export const FormMain = ({
  currentStep,
  steps,
  form,
  onFinish,
  setCurrentStep,
  handleNext,
}) => {
  return (
    <>
      <Steps current={currentStep} style={{ marginBottom: 20 }}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={""}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{ display: currentStep === index ? "block" : "none" }}
          >
            {step.fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.title}
                rules={field.rules}
              >
                {field.type === "textarea" ? (
                  <Input.TextArea autoSize={field.autoSize} />
                ) : field.type === "select" ? (
                  <Select mode={field?.mode} allowClear showSearch>
                    {field?.options?.map((option, index) => (
                      <Option key={index} value={option?.value}>
                        {option?.label}
                      </Option>
                    ))}
                  </Select>
                ) : field.type === "file" ? ( // Check if type is "file"
                  <DynamicUploadComponent
                    filename={"_client_profile"}
                    path={"hire_talent/client/"}
                    accept="image/*"
                    type={"Photo"}
                    onUpload={(profileImageUrl) =>
                      form.setFieldsValue({ [field.name]: profileImageUrl })
                    }
                  />
                ) : field.type === "date" ? (
                  <DatePicker style={{ width: "100%" }} size="large" />
                ) : field.type === "checkbox" ? ( // Add checkbox type
                  <Checkbox>{field.label}</Checkbox>
                ) : (
                  <Input type={field.type} />
                )}
              </Form.Item>
            ))}
          </div>
        ))}
        <Form.Item>
          {currentStep > 0 && (
            <Button
              className=" btn--primary text-white main_border_radius"
              style={{ backgroundColor: "#005c53", marginRight: 8 }}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          <Button
            type="primary"
            className=" btn--primarytext-white main_border_radius"
            style={{ backgroundColor: "#005c53" }}
            onClick={currentStep === steps.length - 1 ? handleNext : handleNext}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
