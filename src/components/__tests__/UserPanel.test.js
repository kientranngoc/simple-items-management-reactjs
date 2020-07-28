import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import UserPanel from '../UserPanel';

const props = {
  isLoggedIn: false,
  name: 'name',
  onLogoutClick: jest.fn(() => null)
}
const loggedInProps = {
  ...props,
  isLoggedIn: true
}
const userPanel = <UserPanel {...props} />
const loggedInUserPanel = <UserPanel {...loggedInProps} />

it('renders without crashing', () => {
  shallow(userPanel);
});

it('contains a Signup Link if not logged in', () => {
  const wrapper = shallow(userPanel);
  expect(wrapper.contains(<Link to="/signup">Signup</Link>)).toBe(true)
})

it('contains a Signin Link if not logged in', () => {
  const wrapper = shallow(userPanel);
  expect(wrapper.contains(<Link to="/signin">Signin</Link>)).toBe(true)
})

it('contains name information if logged in', () => {
  const wrapper = shallow(loggedInUserPanel);
  expect(wrapper.contains(<span>Name:{loggedInProps.name}</span>)).toBe(true)
})

it('contains a Logout button if logged in', () => {
  const wrapper = shallow(loggedInUserPanel);
  expect(wrapper.contains(<button type="button" onClick={loggedInProps.onLogoutClick}>Logout</button>)).toBe(true)
})

it('triggers Logout button event click', () => {
  const wrapper = shallow(loggedInUserPanel);
  wrapper.find('button').simulate('click', {})
  expect(loggedInProps.onLogoutClick.mock.calls.length).toBe(1)
})