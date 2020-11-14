import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  Modal,
  Form,
  Input
} from 'antd';

export const SignIn = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();


  return (
    <Modal
      visible={visible}
      title="Insert username"
      okText="Create"
      cancelText="Generate..."
      onCancel={() => {
        console.log('asdasd')
        form.setFieldsValue({ username: uuid() });
      }}
      onOk={() => {
        form
          .validateFields()
          .then(({ username }) => {
            form.resetFields();
            onCreate(username);
          })
          .catch(info => {
            console.log(info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="username"
          label="Your username"
          rules={[{ required: true, message: 'Insert a username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}