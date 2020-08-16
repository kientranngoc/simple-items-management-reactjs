import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';
import * as auth from '../../libs/utils/auth';

const fetchCategoriesSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      categories: [
        {
          id: 1,
          name: 'name',
          description: 'description',
          created: 'created',
          updated: 'updated',
        },
        {
          id: 2,
          name: 'name',
          description: 'description',
          created: 'created',
          updated: 'updated',
        }
    ]}
  },
}))
const getCurrentUserSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      id: 1,
      name: 'name',
      email: 'email'
    }
  },
}))
const callApiFailed = jest.fn(() => Promise.resolve({
  success: false,
  error: {
    response: {
      data: {
        message: {key: ['message']},
      }
    }
  },
}))
const successProps = {
  accessToken: 'token',
  getCurrentUser: getCurrentUserSuccess,
  fetchCategories: fetchCategoriesSuccess,
}
const failedProps = {
  accessToken: 'token',
  getCurrentUser: callApiFailed,
  fetchCategories: callApiFailed,
}
auth.storeCurrentUser = jest.fn()

it('renders without crashing', () => {
  shallow(<Home {...successProps} />);
});

it('contains UserPanelContainer component', () => {
  const wrapper = shallow(<Home {...successProps} />);
  expect(wrapper.find('Connect(UserPanelContainer)').length).toBe(1)
});

it('contains CategoryList component', () => {
  const wrapper = shallow(<Home {...successProps} />);
  expect(wrapper.find('CategoryList').length).toBe(1)
});

it('store user info on mount if logged in', async () => {
  const wrapper = shallow(<Home {...successProps} />);
  const instance = wrapper.instance()
  expect(auth.storeCurrentUser.mock.calls.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(auth.storeCurrentUser.mock.calls.length > 0).toBe(true)
})

it('not store user info on mount if not logged in', async () => {
  const notLoggedInProps = {...successProps, accessToken: null}
  const wrapper = shallow(<Home {...notLoggedInProps} />);
  const instance = wrapper.instance()
  expect(auth.storeCurrentUser.mock.calls.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(auth.storeCurrentUser.mock.calls.length).toBe(0)
})

it('not store user info on mount if api call failed', async () => {
  const wrapper = shallow(<Home {...failedProps} />);
  const instance = wrapper.instance()
  expect(instance.state.categories.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.categories.length).toBe(0)
})


it('store categories on mount if logged in', async () => {
  const wrapper = shallow(<Home {...successProps} />);
  const instance = wrapper.instance()
  expect(instance.state.categories.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.categories.length).toBe(2)
})

it('not store categories on mount if api call failed', async () => {
  const notLoggedInProps = {...successProps, fetchCategories: callApiFailed}
  const wrapper = shallow(<Home {...notLoggedInProps} />);
  const instance = wrapper.instance()
  expect(instance.state.categories.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.categories.length).toBe(0)
})
