import React from 'react';
import { mount, shallow } from 'enzyme';
import Thanks, { ThanksContainer } from '@containers/Thanks';
import Hero from '@components/Thanks/Hero';

describe('<Thanks />', () => {
  it('renders content', () => {
    const component = mount(<Thanks/>);
    expect(component.getElement()).not.to.be.null;
  });

  it('renders all thanks components', () => {
    const component = shallow(<ThanksContainer/>);
    expect(component.find('div')).to.have.length(1);
    expect(component.find(Hero)).to.have.length(1);
  });

  it('renders the hero with tokenThanks props false', () => {
    const component = shallow(<ThanksContainer />);
    expect(component.find(Hero).props().tokenThanks).toEqual(false);
  });
});
