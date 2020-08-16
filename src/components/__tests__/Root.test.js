import React from 'react';
import { shallow } from 'enzyme';
import { Root } from '../Root';

it('renders without crashing', () => {
  shallow(<Root isLoggedIn={true} />);
});

it('renders Signup component if not logged in yet', () => {
  const wrapper = shallow(<Root isLoggedIn={false} />);
  expect(wrapper.find('Signup').length).toBe(1)
});

it('renders Signin component if not logged in yet', () => {
  const wrapper = shallow(<Root isLoggedIn={false} />);
  expect(wrapper.find('Signin').length).toBe(1)
});
