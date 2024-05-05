import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import "./forget.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "../../redux/actions/user";

const ChangePasswordModule = () => {
  const dispatch = useDispatch();
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setTokens(token);
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setloading] = useState(false);

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData({
      ...formData,
      confirmPassword: e.target.value,
    });
  };

  const onFinish = (values) => {
    console.log("Form values:", values);

    if (values.password !== values.confirmPassword) {
      message.error("Password and Confirm Password do not match");
      return;
    }

    if (values.password.length < 8) {
      message.error("Password must be at least 8 characters long.");
      return;
    }

    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        values.password
      )
    ) {
      message.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    console.log("Form Data:", values);

    setFormData({
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    dispatch(
      updatePasswordAction({
        token: "Bearer " + tokens,
        password: values.password,
      })
    );
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((errorInfo) => {
        message.error("Validation Failed! Try more secure password");
      });
  };
  const updatePasswordReducer = useSelector(
    (state) => state.updatePasswordReducer
  );

  useEffect(() => {
    const { loading, status, error, data } = updatePasswordReducer;
    setloading(loading);
    if (!loading && data && !error) {
      message.success("Password update successfully!.");
    }
    if (!loading && !data && error) {
      message.error("Try again later!");

      console.warn("error", error);
    }
  }, [updatePasswordReducer]);
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <Card
        title="Change Password"
        bordered={false}
        className="forget-card mt-5"
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          name="passwordForm"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
              {
                pattern:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            ]}
          >
            <Input.Password size="large" onChange={handlePasswordChange} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              onBlur={handleConfirmBlur}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className="main_border_radius"
              type="primary"
              style={{ backgroundColor: "#005c53" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordModule;
