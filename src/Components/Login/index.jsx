import React, { useEffect, useState } from "react";
import "../../Assets/css/auth.main.css";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { validateEmail } from "../../Utils/Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import {
  forgetPasswordLinkAction,
  loginUserAction,
} from "../../redux/actions/user";
import mainimg from "../../../src/Assets/img/bdk23qfm.png";
import logo1 from "./Screenshot_1.png";
import logo2 from "./Screenshot_5.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");

  const loginUserReducer = useSelector((state) => state.loginUserReducer);
  const forgetPasswordLinkReducer = useSelector(
    (state) => state.forgetPasswordLinkReducer
  );

  useEffect(() => {
    const { data, loading, error, status, headers } = loginUserReducer;
    setLoading(loading);
    if (!loading && data && !error && data?.status === true) {
      message.success("Login success!.");
    }
    if (!loading && headers?.status !== 200 && headers?.data?.error) {
      message.error(headers?.data?.error);
      console.warn("error", error);
    }
  }, [loginUserReducer]);
  useEffect(() => {
    const { data, loading, error, status } = forgetPasswordLinkReducer;
    setLoading(loading);
    if (!loading && data && !error && data?.status === 200) {
      message.success(data?.message);
    }
    if (!loading && error) {
      message.error("something went wrong");
      console.warn("error", error);
    }
  }, [forgetPasswordLinkReducer]);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(loginUserAction({ ...values }));
  };

  const handleForgetPasswordSubmit = () => {
    console.log("Email:", email);
    dispatch(forgetPasswordLinkAction({ email: email }));
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
      <div className="content-wrapper">
        <div className="content">
          <div className="box-container mt-16">
            <div className="box-helper">
              <div className="box">
                <div className="flex justify-center">
                  <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">GupChup</span>
                    <img className="h-8 w-auto" src={logo2} alt="" />
                  </a>
                </div>
                <h2 className="centered mb-2 mt-4">
                  {" "}
                  {forgetPasswordVisible ? "Forget Password" : "Sign In"}
                </h2>
                {forgetPasswordVisible ? (
                  <Form onFinish={handleForgetPasswordSubmit} layout="vertical">
                    <Form.Item
                      label="E-mail"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          validator: validateEmail,
                        },
                      ]}
                    >
                      <Input
                        className="p-2"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="btn btn--primary mt-m text-white  cursor-pointer main_border_radius"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ marginRight: 8 }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                      label="E-mail"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          validator: validateEmail,
                        },
                      ]}
                    >
                      <Input className="p-2" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input type="password" className="p-2" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="btn btn--primary mt-m text-white  cursor-pointer main_border_radius"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ marginRight: 8 }}
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                )}
                <p className="text-center mt-2">
                  Don't have account?<Link to="/signup">Create Account</Link>
                </p>
                <p className="text-center mt-2">
                  <Link
                    onClick={() => {
                      setForgetPasswordVisible(
                        forgetPasswordVisible ? false : true
                      );
                    }}
                  >
                    {forgetPasswordVisible ? "Login" : "Forget Password"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
