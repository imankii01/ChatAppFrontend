import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleEmailSubmit = async () => {
    try {
      setLoadingOtp(true);
      const response = await axios.post("http://localhost:3001/api/send-otp", {
        email,
      });

      if (response.data.success) {
        setShowOtpInput(true);
        setCurrentStep(2);
        notification.success({
          message: "OTP Sent",
          description: "An OTP has been sent to your email address.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to send OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while processing your request.",
      });
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setLoadingSave(true);
      const response = await axios.post(
        "http://localhost:3001/api/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.data.success) {
        notification.success({
          message: "OTP Verified",
          description: "You have successfully verified your email address.",
        });
        setShowOtpInput(false);
        setCurrentStep(3);
      } else {
        notification.error({
          message: "Invalid OTP",
          description: "Please enter a valid OTP.",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while processing your request.",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  const handleNameSubmit = async () => {
    try {
      setLoadingSave(true);
      const response = await axios.post(
        "http://localhost:3001/api/save-user-details",
        {
          email,
          name,
          phoneNumber,
        }
      );

      if (response.data.success) {
        notification.success({
          message: "User Details Saved",
          description: "Your details have been successfully saved.",
        });
        // You can redirect the user to the next page or perform additional actions here
        // For now, let's redirect to the dashboard
        // history.push('/dashboard');
        alert("done");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to save user details. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while processing your request.",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    GupChup -Chat app
                  </h2>
                  <p className="text-white-50 mb-5">
                    A highly secure chat webApp.
                  </p>
                  {currentStep === 1 && (
                    <Form onFinish={handleEmailSubmit}>
                      <Form.Item
                        name="text"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email!",
                          },
                          { type: "email", message: "Invalid email format!" },
                        ]}
                      >
                        <Input
                          type="text" // Change the type from 'email' to 'text'
                          className="form-control form-control-lg"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                          loading={loadingOtp}
                          onClick={handleEmailSubmit}
                        >
                          Send OTP
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                  {currentStep === 2 && (
                    <Form onFinish={handleOtpSubmit}>
                      <Form.Item
                        name="otp"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the OTP sent to your email!",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          id="typeOtp"
                          className="form-control form-control-lg"
                          placeholder="Enter OTP"
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                          loading={loadingSave}
                          onClick={handleOtpSubmit}
                        >
                          Verify OTP
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                  {currentStep === 3 && (
                    <Form onFinish={handleNameSubmit}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your name!",
                          },
                        ]}
                      >
                        <Input
                          id="name"
                          className="form-control form-control-lg"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number!",
                          },
                        ]}
                      >
                        <Input
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          placeholder="Phone Number"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          className="btn btn-outline-light btn-lg px-5"
                          type="submit"
                          loading={loadingSave}
                          onClick={handleNameSubmit}
                        >
                          Save Details
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
