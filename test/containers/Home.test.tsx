import React from 'react';
import { mount, shallow } from 'enzyme';
import Home, { HomeComponent } from '@containers/Home';
import HomeRouteWrapper from '@containers/Video';
import { MemoryRouter } from 'react-router';
import { Modal } from 'antd';

import Hero from '@components/Hero';
import Solution from '@components/Solution';
import Chain from '@components/Chain';
import Dapp from '@components/Dapp';
import BuildDapp from '@components/BuildDapp';
import Cta from '@components/Cta';
import ExplainerCta from '@components/ExplainerCta';
import { MarketDescriptionText, MarketDescriptionWrapper } from '@src/Styles';

describe('<Home />', () => {
  it('renders content', () => {
    const component = mount(<Home />);
    expect(component.getElement()).not.to.be.null;
  });

  it('renders all site components', () => {
    const component = shallow(<HomeComponent />);
    expect(component.find('div')).to.have.length(1);
    expect(component.find(Hero)).to.have.length(1);
    expect(component.find(ExplainerCta)).to.have.length(1);
    expect(component.find(Solution)).to.have.length(1);
    expect(component.find(Chain)).to.have.length(1);
    expect(component.find(Dapp)).to.have.length(1);
    expect(component.find(BuildDapp)).to.have.length(1);
    expect(component.find(Cta)).to.have.length(1);
  });

  it('renders the MarketDescriptionText with site name', () => {
    const component = shallow(<HomeComponent />);
    expect(component.find(MarketDescriptionWrapper)).to.have.length(1);
    expect(component.find(MarketDescriptionText)).to.have.length(1);
    const spanComponent = component.find(MarketDescriptionText).find('span');
    expect(spanComponent).to.have.length(1);
    expect(spanComponent.render().text()).to.equal('MARKET Protocol');
  });

  it('renders the subscribe form with subscriptionPopUpVisible prop', () => {
    const component = shallow(<HomeComponent subscriptionPopUpVisible />);
    expect(component.find(Cta).props().subscriptionPopUpVisible).toEqual(true);
  });

  it('renders all site components with route wrapper', () => {
    const component = mount(<HomeRouteWrapper />);
    expect(component.getElement()).not.to.be.null;
  });

  it('renders with video expanded', () => {
    const component = shallow(<HomeComponent enableVideo={true}></HomeComponent>);
    expect(component.find(ExplainerCta).props().enableVideo).toEqual(true);
  });

  it('video section is expanded', () => {
    const component = mount(<ExplainerCta enableVideo={true}></ExplainerCta>);
    expect(component.find(Modal).props().visible).toEqual(true);
  })
});
