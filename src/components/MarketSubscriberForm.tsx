import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import env from '../constants/environment';

const FormItem = Form.Item;

/**
 * Simple subscription form to subscribing to different GetResponse Lists.
 * Just specify the campaignToken for the list and it should work out of the box
 *
 */

const style = {
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  padding: '1.2rem'
};

const DisclaimerText = styled('small')`
  font-size: 9px;
  margin-top: 2rem;
  opacity: 0.6;
`;

export const SubscriptionPopUp = ({ form, onCancel, visible }) => (
  <Modal
    bodyStyle={style}
    visible={visible}
    footer={null}
    width="30rem"
    onCancel={onCancel}
  >
    <Form
      onSubmit={e => {
        e.preventDefault();

        form.validateFields((errors, values) => {
          values.listId = 5326022;
          if (!errors) {
            fetch(env.MAIL_LISTER_API, {
              body: JSON.stringify(values),
              method: 'post'
            }).then((response) => {
              if (response.status === 200) {
                window.location = '/';
              }
            });
          }
        });
      }}
      style={{ textAlign: 'center' }}
      acceptCharset="utf-8"
      method="post"
    >
      <h2 style={{ textAlign: 'center', margin: '1rem 0  2rem 0' }}>
        Join Our Newsletter
      </h2>
      <FormItem>
        {form.getFieldDecorator('firstName', {
          rules: [
            {
              message: 'Please input your first name!',
              required: true,
              whitespace: true
            }
          ]
        })(
          <Input
            name="firstName"
            type="text"
            placeholder="First name"
            style={{
              backgroundColor: '#f6f6f6',
              marginTop: '10px'
            }}
          />
        )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('lastName', {
          rules: [
            {
              message: 'Please input your last name!',
              required: true,
              whitespace: true
            }
          ]
        })(
          <Input
            name="lastName"
            type="text"
            placeholder="Last name"
            style={{
              backgroundColor: '#f6f6f6'
            }}
          />
        )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('email', {
          rules: [
            {
              message: 'Please input an Email!',
              required: true
            },
            {
              message: 'Please input a correct Email',
              type: 'email'
            }
          ]
        })(
          <Input
            name="email"
            placeholder="Your email"
            style={{
              backgroundColor: '#f6f6f6'
            }}
          />
        )}
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          marginTop: '1rem',
          width: '10rem'
        }}
      >
        Submit
      </Button>
    </Form>
    <DisclaimerText>
      You can change your mind at any time by clicking the unsubscribe link in
      the footer of any email you receive from us, or by contacting us at{' '}
      <a href="info@marketprotocol.io">info@marketprotocol.io</a>. We will treat
      your information with respect. By clicking above, you agree that we may
      process your information in accordance with these terms.
    </DisclaimerText>
    {/* These are the field name for these parameters in mailchimp */}
    {/* <input type="text" name="MERGE1" id="MERGE1" /> */} {/*First Name*/}
    {/* <input type="text" name="MERGE2" id="MERGE2" /> */} {/*Last Name*/}
  </Modal>
);

const WrappedForm = Form.create()(SubscriptionPopUp);

export default WrappedForm;
