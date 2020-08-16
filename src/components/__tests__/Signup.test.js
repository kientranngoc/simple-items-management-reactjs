import React from 'react';
import { shallow } from 'enzyme';
import SignupFormContainer from '../SignupFormContainer';
import Signup from '../Signup';

it('renders without crashing', () => {
  shallow(<Signup />);
});

it('contains a h1 element', () => {
  const wrapper = shallow(<Signup />);
  expect(wrapper.contains(<h1>Signup</h1>)).toBe(true)
})

it('contains a SignupFormContainer component', () => {
  const wrapper = shallow(<Signup />);
  expect(wrapper.contains(<SignupFormContainer />)).toBe(true)
})
