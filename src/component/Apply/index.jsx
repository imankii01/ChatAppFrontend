import React, { useEffect } from "react";
import { REACT_USER_ID } from "../../tokenProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsAction,
  updateUserDetailsAction,
} from "../../redux/actions/common";
import { Form, Input, Button, message } from "antd";

const Apply = () => {
  const user_id = REACT_USER_ID;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUserDetailsAction(user_id));
  }, [user_id, dispatch]);

  const getUserDetailsReducer = useSelector(
    (state) => state?.getUserDetailsReducer
  );
  const { data, loading, status, error } = getUserDetailsReducer;

  const onFinish = (values) => {
    // Handle form submission here
    console.log("Form values:", values);
    const data = {
      ...values,
      user_id: REACT_USER_ID,
    };
    dispatch(updateUserDetailsAction(data));
    message.success("Form submitted successfully!");
  };

  return (
    <div>
      <h1>Apply</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone number"
          rules={[{ required: true, message: "Please enter your Phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Apply;
