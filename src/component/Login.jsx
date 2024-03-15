import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, message } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction, verifyOtpAction } from "../redux/actions/common";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { REACT_EMAIL_ID, REACT_TOKEN_AUTH, REACT_USER_ID } from "../tokenProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60); // Initial time remaining until next OTP can be sent

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleEmailSubmit = async () => {
    try {
      setLoadingOtp(true);
      const response = await axios.post("http://localhost:3001/api/send-otp", {
        email,
      });
      console.log("response", response);
      if (response.data.success) {
        // Save data to local storage

        setShowOtpInput(true);
        setCurrentStep(2);
        setTimeRemaining(60); // Reset time remaining when OTP is sent
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOtpSubmit = async () => {
    dispatch(verifyOtpAction({ email, otp }));

  };
  const [loading, setLoading] = useState(null);
  const verifyOtpReducer = useSelector((state) => {
    const data = state.verifyOtpReducer || [];
    return data;
  });
  useEffect(() => {
    const { data, error, status, loading } = verifyOtpReducer;
    setLoading(loading);
    setLoadingSave(loading);
    
    if (!loading && data && error === undefined) {
      localStorage.setItem("user_id", data?.user_id);
      localStorage.setItem("email", data?.email);
      localStorage.setItem("token", data?.token); 
      // Check if necessary data exists in local storage
      const storedUserId = localStorage.getItem("user_id");
      const storedEmail = localStorage.getItem("email");
      const storedToken = localStorage.getItem("token");
      if (storedUserId && storedEmail && storedToken) {
        navigate('/apply');
      }
    }
    
    if (!loading && data === undefined && error !== undefined) {
      message.error(error)
    }
  }, [verifyOtpReducer, navigate]);
  

  const handleSendOtpAgain = () => {
    if (timeRemaining === 0) {
      handleEmailSubmit();
    } else {
      notification.warning({
        message: "Please wait",
        description: `You can send OTP again in ${timeRemaining} seconds.`,
      });
    }
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <TailSpin ariaLabel="Loading..." color="#00BFFF" />
        </div>
      )}
      <motion.section
        className="gradient-custom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="card bg-dark text-white"
          style={{ borderRadius: "1rem" }}
        >
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">GupChup -Chat app</h2>
              <p className="text-white-50 mb-5">A highly secure chat webApp.</p>
              {currentStep === 1 && (
                <Form onFinish={handleEmailSubmit}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Invalid email format!" },
                    ]}
                  >
                    <Input
                      type="text"
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
                      Submit
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
                  <Form.Item>
                    <Button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={handleSendOtpAgain}
                      disabled={timeRemaining !== 0}
                    >
                      Send OTP Again ({timeRemaining}s)
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Login;
