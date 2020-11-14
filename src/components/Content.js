import React from 'react';
import { map } from 'ramda';
import { Layout, Row, Col, Form, Input, Select, Button } from 'antd';
import { MessageList } from 'react-chat-elements'

export const Content = ({ current, userID, messages, handleToSubmit }) => {
  const [form] = Form.useForm();

  // parser
  const messagesP = map(
    (m) => ({
        title: userID === m.user_id ? 'you' : userID,
        position: userID === m.user_id ? 'right' : 'left',
        type: 'text',
        text: m.message,
        date: new Date(),
    }),
    messages
  );

  return (
    <Layout.Content style={{ margin: '0 16px' }}>
      <Row>
        <Col span={24}>
          <MessageList
            className='message-list message-list-size'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={messagesP}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            form={form}
            name="customized_form_controls"
            layout="inline"
            onFinish={() => {
              form
                .validateFields()
                .then(({ message }) => {
                  form.resetFields();
                  handleToSubmit({ type: current, user_id: userID, message: message });
                })
                .catch(info => {
                  console.log(info);
                });
            }}
            initialValues={{
              message: "",
            }}
          >
            <Form.Item name="message">
              <Input.TextArea
                type="text"
                style={{ width: '1330px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout.Content>
  );
};