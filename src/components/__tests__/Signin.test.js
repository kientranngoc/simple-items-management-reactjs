import React from 'react';
import { shallow } from 'enzyme';
import SigninFormContainer from '../SigninFormContainer';
import Signin from '../Signin';

it('renders without crashing', () => {
  shallow(<Signin />);
});

it('contains a h1 element', () => {
  const wrapper = shallow(<Signin />);
  expect(wrapper.contains(<h1>Signin</h1>)).toBe(true)
})

it('contains a SigninFormContainer component', () => {
  const wrapper = shallow(<Signin />);
  expect(wrapper.contains(<SigninFormContainer />)).toBe(true)
})
