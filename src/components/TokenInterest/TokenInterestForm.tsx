import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import countries from './countries';
import { device, size } from '@src/breakpoints';
import fetch from 'isomorphic-fetch';
import env from '../../constants/environment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

export const StyledSelect = styled(Select)`
  .ant-select-selection {
    background: #f6f6f6 !important;
    border: 0;
  }
  .ant-select-selection__clear {
    background-color: #f6f6f6 !important;
  }
`;

const SectionWrapper = styled.section`
  padding: 70px 0;
  background: #f0f0f0;

  @media ${device.mobileS} and (max-width: ${size.tablet}) {
    padding: 0px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  line-height: 2 !important;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

interface State {
  citizen: string;
  currency: string;
}

class TokenInterestForm extends React.Component<FormComponentProps, State> {
  postfixSelector = (
    <StyledSelect
      defaultValue="USD"
      dropdownMenuStyle={{ backgroundColor: '#f6f6f6' }}
      filterOption={true}
      style={{
        backgroundColor: 'transparent',
        width: 80
      }}
      onChange={(currency: string) => this.setState({ currency })}
    >
      <Option value="USD">USD</Option>
      <Option value="ETH">ETH</Option>
      <Option value="BTC">BTC</Option>
    </StyledSelect>
  );

  constructor(props: FormComponentProps) {
    super(props);

    this.state = {
      citizen: '',
      currency: 'USD'
    };
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <SectionWrapper>
        <Row type="flex" justify="center">
          <Col
            xs={24}
            sm={24}
            md={16}
            xl={12}
            style={{ background: '#fff', padding: '50px' }}
          >
            <h1 style={{ fontSize: '2rem' }}>Interested in Contributing?</h1>
            <Form
              onSubmit={e => {
                e.preventDefault();

                form.validateFields((errors, values) => {
                  values.listId = 5326073;
                  values.allocation = parseInt(values.allocation, 10);
                  values.allocationCurrency = this.state.currency;
                  values.citizenship = this.state.citizen;
                  values.legal = `${values.legal}`;
                  if (!errors) {
                    fetch(env.MAIL_LISTER_API, {
                      method: 'post',
                      body: JSON.stringify(values)
                    }).then(function(response) {
                      if (response.status === 200) {
                        window.location = '/';
                      }
                    });
                  }
                });
              }}
              acceptCharset="utf-8"
              method="post"
              autoComplete={'off'}
            >
              <input type="hidden" name="citizen" value={this.state.citizen} />
              <input
                type="hidden"
                name="allocationCurrency"
                value={this.state.currency}
              />

              <FormItem label="Full Name">
                {getFieldDecorator('fullName', {
                  rules: [
                    {
                      message: 'Please input your full name!',
                      required: true,
                      whitespace: true
                    }
                  ]
                })(
                  <Input
                    name="fullName"
                    type="text"
                    placeholder="Full name"
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Email Address">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      message: 'Please input an Email Address!',
                      required: true
                    },
                    {
                      message: 'Please input a correct Email Address',
                      type: 'email'
                    }
                  ]
                })(
                  <Input
                    name="email"
                    placeholder="Your email address"
                    style={{
                      backgroundColor: '#f6f6f6'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Are you an accredited investor?">
                {getFieldDecorator('accreditedInvestor', {
                  initialValue: 'Yes'
                })(
                  <RadioGroup name="accreditedInvestor">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem label="What type of entity do you represent?">
                {getFieldDecorator('entity', { initialValue: 'individual' })(
                  <RadioGroup name="entity">
                    <Radio value="Individual">Individual</Radio>
                    <Radio value="Syndicate">Syndicate</Radio>
                    <Radio value="Professional Fund">Professional Fund</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem label="Desired Purchase Amount">
                {getFieldDecorator('allocation', {
                  rules: [
                    {
                      message: 'Desired purchase amount is required',
                      required: true
                    },
                    {
                      validator: (rule, value, callback) => {
                        return parseInt(value, 10) < 1
                          ? callback('Minimum purchase amount value is 1')
                          : callback();
                      }
                    }
                  ]
                })(
                  <Input
                    name="allocation"
                    placeholder="25000"
                    addonAfter={this.postfixSelector}
                    style={{
                      backgroundColor: '#f6f6f6',
                      width: 250
                    }}
                    type="number"
                  />
                )}
              </FormItem>
              <FormItem label="Citizenship">
                {getFieldDecorator('citizenship', {
                  rules: [
                    {
                      message: 'Citizenship is required',
                      required: true
                    }
                  ]
                })(
                  <StyledSelect
                    placeholder="SELECT COUNTRY"
                    style={{
                      width: 250
                    }}
                    dropdownStyle={{ backgroundColor: '#f6f6f6' }}
                    dropdownMenuStyle={{ backgroundColor: '#f6f6f6' }}
                    onChange={(citizen: string) => this.setState({ citizen })}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {countries.map(c => (
                      <Option key={c.code} value={c.name}>
                        {c.name}
                      </Option>
                    ))}
                  </StyledSelect>
                )}
              </FormItem>
              <FormItem label="ETH or BTC address you plan to send from (optional)">
                {getFieldDecorator('cryptoAddress')(
                  <Input
                    name="cryptoAddress"
                    placeholder="0x..."
                    type="text"
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Anything else we should know? (optional)">
                {getFieldDecorator('notes')(
                  <TextArea
                    name="notes"
                    rows={4}
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('legal', {
                  rules: [
                    {
                      message: 'Please check this option to continue',
                      required: true
                    }
                  ]
                })(
                  <StyledCheckbox>
                    You agree that completion of this form is for informational
                    purposes only, and does not constitute an offer for the sale
                    of Market tokens, nor for the sale of any equity or other
                    ownership or other interest in Market Limited.
                  </StyledCheckbox>
                )}
              </FormItem>
              <ButtonWrapper>
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
              </ButtonWrapper>
            </Form>
          </Col>
        </Row>
      </SectionWrapper>
    );
  }
}

const WrappedForm = Form.create<FormComponentProps>()(TokenInterestForm);

export default WrappedForm;
