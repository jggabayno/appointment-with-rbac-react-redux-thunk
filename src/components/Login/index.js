import React, { useEffect } from "react";
import "./index.scss";

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions'


import { Row, Col, Form, Input, Button, message } from "antd";

export default function Login() {

  const [form] = Form.useForm();

  const auth = useSelector(state => state.auth);

  const { isLoginRejected } = auth;

  const loginDispatch = useDispatch();

  async function onSubmit(credentials) {

    loginDispatch(login(credentials))
  }

  useEffect(() => { isLoginRejected && message.error("Incorrect Email/Password") }, [isLoginRejected]);

  return (
    <Row type="flex" justify="space-between" align="middle" className="login">
      <Col span={18} className="bg"></Col>
      <Col span={6} className="wrapForm">
        <Form
          form={form}
          name="login"
          onFinish={onSubmit}
          layout="vertical"
          hideRequiredMark
          scrollToFirstError
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
