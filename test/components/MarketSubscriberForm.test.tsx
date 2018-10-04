import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';

import MarketSubscriberForm from '@components/MarketSubscriberForm';

describe('<MarketSubscriberForm />', () => {
  it('renders h2 with header text', () => {
    const component = mount(<MarketSubscriberForm visible />);
    expect(component.find('h2')).to.have.length(1);
    expect(
      component
        .find('h2')
        .render()
        .text()
    ).to.equal('Join Our Newsletter');
  });

  it('renders form', () => {
    const component = mount(<MarketSubscriberForm visible />);
    const formComponent = component.find(Form);
    const formComponentProps = formComponent.props();
    expect(formComponent).to.have.length(1);
    expect(formComponentProps.method).to.equal('post');
  });

  it('adds validation for first name', () => {
    const component = mount(<MarketSubscriberForm visible />);
    const firstNameInput = component.find('input[name="firstName"]');
    firstNameInput.simulate('change', { target: { value: '  ' }});
    expect(
      component
      .find('.ant-form-explain')
      .render()
      .text()
    ).to.equal('Please input your first name!');
  });

  it('adds validation for last name', () => {
    const component = mount(<MarketSubscriberForm visible />);
    const lastNameInput = component.find('input[name="lastName"]');
    lastNameInput.simulate('change', { target: { value: '  ' } });
    expect(
      component
        .find('.ant-form-explain')
        .render()
        .text()
    ).to.equal('Please input your last name!');
  });

  it('adds validation for email field', () => {
    const component = mount(<MarketSubscriberForm visible />);
    const emailInput = component.find('input[name="email"]');
    emailInput.simulate('change', { target: { value: 'hello' } });
    expect(
      component
        .find('.ant-form-explain')
        .render()
        .text()
    ).to.equal('Please input a correct Email');
    emailInput.simulate('change', { target: { value: '' } });
    expect(
      component
        .find('.ant-form-explain')
        .render()
        .text()
    ).to.equal('Please input an Email!');
  });

  it('displays validation on submitting form without entering value', () => {
    const preventDefaultMock = jest.fn();
    const component = mount(<MarketSubscriberForm visible />);
    const formComponent = component.find(Form);
    expect(component.find('.ant-form-explain')).to.have.length(0);
    formComponent.simulate('submit', { preventDefault: preventDefaultMock });
    expect(component.find('.ant-form-explain')).to.have.length(3);
    expect(preventDefaultMock.mock.calls.length).to.equal(1);
  });

  it('does not display validation on submitting form if valid value is entered', () => {
    const preventDefaultMock = jest.fn();
    const component = mount(<MarketSubscriberForm visible />);
    const formComponent = component.find(Form);
    const emailInput = component.find('input[name="email"]');
    const firstNameInput = component.find('input[name="firstName"]');
    const lastNameInput = component.find('input[name="lastName"]');
    expect(component.find('.ant-form-explain')).to.have.length(0);
    emailInput.simulate('change', { target: { value: 'trial@gmail.com' } });
    firstNameInput.simulate('change', { target: { value: 'firstname' } });
    lastNameInput.simulate('change', { target: { value: 'lastname' } });
    formComponent.simulate('submit', { preventDefault: preventDefaultMock });
    expect(component.find('.ant-form-explain')).to.have.length(0);
  });
});
