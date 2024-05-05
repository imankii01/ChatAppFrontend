import { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../Utils/Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { singupUserAction } from "../../redux/actions/user";
import mainimg from "../../../src/Assets/img/bdk23qfm.png";
import { TailSpin } from "react-loader-spinner";
import logo2 from "./Screenshot_5.png";
const { Option } = Select;
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const signupUserReducer = useSelector((state) => state.signupUserReducer);
  useEffect(() => {
    const { data, loading, error, headers } = signupUserReducer;

    setLoading(loading);
    if (!loading && data && !error && data?.status === true) {
      message.success("signup success!.");
    }
    if (!loading && error && headers?.status !== 200) {
      message.error(headers?.data?.error);
      console.warn("error", error);
    }
  }, [dispatch, signupUserReducer]);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(singupUserAction({ ...values }));
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
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">GupChup</span>
                    <img className="h-8 w-auto" src={logo2} alt="" />
                  </a>
                </div>
                <h2 className="centered mb-2 mt-4">Sign Up</h2>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name",
                      },
                    ]}
                  >
                    <Input className="p-2" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name",
                      },
                    ]}
                  >
                    <Input className="p-2" />
                  </Form.Item>
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
                      {
                        validator: validatePassword,
                      },
                    ]}
                  >
                    <Input.Password className="p-2" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords that you entered do not match!"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="p-2" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="btn btn--primary  text-white cursor-pointer main_border_radius"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{ marginRight: 8 }}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
                <p className="text-center mt-2">
                  Already have an account? <Link to="/login">Login </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
