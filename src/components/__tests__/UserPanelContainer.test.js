import React from 'react';
import { shallow } from 'enzyme';
import { UserPanelContainer } from '../UserPanelContainer';
import UserPanel from '../UserPanel';

const loggedInProps = {
  logout: jest.fn(),
  info: {
    name: 'name'
  },
  isLoggedIn: true
} 
const fakeEvent = {
  preventDefault: jest.fn()
}

it('renders without crashing', () => {
  shallow(<UserPanelContainer {...loggedInProps} />);
});

it('contains name', () => {
  const wrapper = shallow(<UserPanelContainer {...loggedInProps} />);
  const instance = wrapper.instance()
  expect(wrapper.contains(
    <UserPanel 
      isLoggedIn={loggedInProps.isLoggedIn} 
      name={loggedInProps.info.name} 
      onLogoutClick={instance.onLogoutClick}
    />)).toBe(true)
});

it('logout success', () => {
  const wrapper = shallow(<UserPanelContainer {...loggedInProps} />);
  const instance = wrapper.instance()
  instance.onLogoutClick(fakeEvent)
  expect(loggedInProps.logout.mock.calls.length).toBe(1)
})

it('contains no name if not logged in yet', () => {
  const notLoggedInProps = {
    logout: jest.fn(),
    info: null,
    isLoggedIn: false
  }
  const wrapper = shallow(<UserPanelContainer {...notLoggedInProps} />);
  const instance = wrapper.instance()
  expect(wrapper.contains(
    <UserPanel 
      isLoggedIn={notLoggedInProps.isLoggedIn} 
      name={''} 
      onLogoutClick={instance.onLogoutClick}
    />)).toBe(true)
});
