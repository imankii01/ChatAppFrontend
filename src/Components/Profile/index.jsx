import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getuserDetailsAction,
  updateUserDetailsAction,
} from "../../redux/actions/user";
import { Timezones_List, countries, languages } from "../../Assets/data/common";
import { reactUserId } from "../Auth/tokenProvider";
const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();

  const getUserDetailReducer = useSelector(
    (state) => state.getUserDetailReducer
  );
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!getUserDetailReducer.loading && getUserDetailReducer.data) {
      form.setFieldsValue(getUserDetailReducer.data);
    }
  }, [getUserDetailReducer.data, getUserDetailReducer.loading]);

  const onFinish = (values) => {
    console.log("Form values:", values);
    dispatch(updateUserDetailsAction({ user_id: reactUserId, ...values }));
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {getUserDetailReducer.data?.photo &&
        getUserDetailReducer.data?.photo !== "" ? (
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 70,
              xxl: 80,
            }}
            src={`${process.env.REACT_APP_IMAGES_BASE_URL}${getUserDetailReducer.data?.photo}`}
          />
        ) : (
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 70,
              xxl: 80,
            }}
            icon={<UserOutlined />}
          />
        )}
      </div>
      <h1 style={{ textAlign: "center" }}>Profile</h1>
      <Button
        className="main_border_radius"
        onClick={handleEdit}
        style={{ marginBottom: "20px", backgroundColor: "#00756a" }}
      >
        {editable ? "Cancel Edit Profile" : "Edit Profile"}
      </Button>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={getUserDetailReducer.data}
        disabled={!editable}
      >
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {/* <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col> */}

          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="contact"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="languagePreference"
              label="Language Preference"
              rules={[
                {
                  required: true,
                  message: "Please select your language preference!",
                },
              ]}
            >
              <Select allowClear showSearch>
                {languages.map((option, index) => (
                  <Option key={index} value={option?.value}>
                    {option?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select allowClear showSearch>
                {countries.map((option, index) => (
                  <Option key={index} value={option?.value}>
                    {option?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="timezone"
              label="Time Zone"
              rules={[
                { required: true, message: "Please select your time zone!" },
              ]}
            >
              <Select allowClear showSearch>
                {Timezones_List.map((option, index) => (
                  <Option key={index} value={option?.value}>
                    {option?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {/* <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item name="address" label="Address">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button
            className="main_border_radius"
            type="primary"
            htmlType="submit"
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
