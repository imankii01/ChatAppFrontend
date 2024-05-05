import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, message, Card } from "antd";
import { Timezones_List, countries, languages } from "../../Assets/data/common";
import DynamicUploadComponent from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { updateUserDetailsAction } from "../../redux/actions/user";
import { REACT_USER_ID, reactUserId } from "../Auth/tokenProvider";
import { FormMain } from "../../Utils/FormModal";
import { RegistrationForm } from "../../Assets/data/ClientData";

const { Option } = Select;

const Registration = () => {
  const steps = RegistrationForm;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateUserDetailReducer = useSelector(
    (state) => state.updateUserDetailReducer
  );

  useEffect(() => {
    const { loading, status, error, data } = updateUserDetailReducer;
    setLoading(loading);
    if (!loading && data && !error) {
      message.success("User created successfully");
      setCurrentStep(0);
      window.location.href = "/dashboard/jobs";
    }
    if (!loading && !data && error) {
      console.warn("error", error);
    }
  }, [updateUserDetailReducer]);

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        user_id: reactUserId(),
        ...values,
        status: "registered",
      };
      dispatch(updateUserDetailsAction(data));
    } catch (error) {
      message.error("Failed to add/update client");
    }
  };

  const handleNext = async () => {
    try {
      const currentFields = steps[currentStep].fields.map(
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
    <>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin ariaLabel="Loading..." color="#005c53" />
        </div>
      ) : null}
      <div className="d-flex justify-content-center align-items-center ">
        <Card style={{ width: 500 }}>
          <h2 className="text-center mb-4">Registration</h2>

          <FormMain
            currentStep={currentStep}
            steps={steps}
            form={form}
            onFinish={onFinish}
            setCurrentStep={setCurrentStep}
            handleNext={handleNext}
          />
        </Card>
      </div>
    </>
  );
};

export default Registration;
