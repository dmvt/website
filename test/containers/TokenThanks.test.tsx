import React from 'react';
import { mount, shallow } from 'enzyme';
import TokenThanks, { TokenThanksContainer } from '@containers/TokenThanks';
import Hero from '@components/Thanks/Hero';

describe('<TokenThanks />', () => {
  it('renders content', () => {
    const component = mount(<TokenThanks/>);
    expect(component.getElement()).not.to.be.null;
  });

  it('renders all thanks components', () => {
    const component = shallow(<TokenThanksContainer/>);
    expect(component.find('div')).to.have.length(1);
    expect(component.find(Hero)).to.have.length(1);
  });

  it('renders the hero with tokenThanks props true', () => {
    const component = shallow(<TokenThanksContainer />);
    expect(component.find(Hero).props().tokenThanks).toEqual(true);
  });
});
