import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { getAccessToken } from "../Auth/tokenProvider";
import { useDispatch, useSelector } from "react-redux";
import { postFeedbackAction } from "../../redux/actions/common";
import { TailSpin } from "react-loader-spinner";

const Feedback = ({ FeedbackModal, setFeedbackModal }) => {
  const dispatch = useDispatch();
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const postFeedbackReducer = useSelector((state) => state.postFeedbackReducer);
  const handleCancel = () => {
    setFeedbackModal(false);
  };

  const onFinish = (values) => {
    dispatch(postFeedbackAction({ ...values }));
  };

  useEffect(() => {
    const { data, loading, error, status } = postFeedbackReducer;
    setLoading(loading);
    if (!loading && data && !error) {
      message.success("Feedback submitted successfully!");
      setFeedbackModal(false);
      form.resetFields(); // Reset form fields after successful submission
    }
    if (!loading && !data && error) {
      console.warn("Error:", error);
    }
  }, [postFeedbackReducer, setFeedbackModal, form]);

  return (
    <Modal
      title="Feedback"
      visible={FeedbackModal}
      onCancel={handleCancel}
      footer={null}
      centered
      bodyStyle={{ paddingBottom: 0 }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin ariaLabel="Loading..." color="#005c53" />
        </div>
      )}
      <Form form={form} onFinish={onFinish} layout="vertical">
        {!token && (
          <>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button
            className="main_border_radius"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="main_border_radius"
            onClick={handleCancel}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Feedback;
