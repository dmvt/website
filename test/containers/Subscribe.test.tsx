import React from 'react';
import { mount } from 'enzyme';
import Subscribe from '@containers/Home';

describe('<Subscribe />', () => {
  it('renders content', () => {
    const component = mount(<Subscribe />);
    expect(component.getElement()).not.to.be.null;
  });
});
