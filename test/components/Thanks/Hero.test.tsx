import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'antd';
import Hero, { MessageDescription, Section } from '@components/Thanks/Hero';

describe('<Hero />', () => {
  it('renders section', () => {
    const component = shallow(<Hero />);
    expect(component.find(Section)).to.have.length(1);
  });

  it('renders one Row component', () => {
    const component = shallow(<Hero />);
    const rowComponent = component.find(Row);
    const rowComponentProps = rowComponent.props();
    expect(rowComponent).to.have.length(1);
    expect(rowComponentProps.type).to.equal('flex');
    expect(rowComponentProps.align).to.equal('middle');
    expect(rowComponentProps.justify).to.equal('center');
  });

  it('renders token text if tokenThanks props is true', () => {
    const component = shallow(<Hero tokenThanks={true}/>);
    expect(
      component
        .find(MessageDescription)
        .render()
        .text()
    ).to.equal(`Thanks for your interest in our token,
                we will be sure to keep you up to date as more information becomes available!`);
  });

  it('renders normal text if tokenThanks props is false', () => {
    const component = shallow(<Hero tokenThanks={false}/>);
    expect(
      component
        .find(MessageDescription)
        .render()
        .text()
    ).to.equal(`We will be sure to keep you up to date as more information becomes available!`);
  });
});
