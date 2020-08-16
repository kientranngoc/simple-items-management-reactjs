import React from 'react';
import { shallow } from 'enzyme';
import { SignupFormContainer } from '../SignupFormContainer';
import * as auth from '../../libs/utils/auth';

const fakeSignupSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      access_token: 'token',
    }
  },
}))
const fakeSignupFailed = jest.fn(() => Promise.resolve({
  success: false,
  error: {
    response: {
      data: {
        message: {key: ['message']},
      }
    }
  },
}))
const fakeFormSubmitEvent = {
  target: {
    name: {
      value: 'name'
    },
    email: {
      value: 'email'
    },
    username: {
      value: 'username'
    },
    password: {
      value: 'password'
    }
  },
  preventDefault: jest.fn()
}
auth.setToken = jest.fn()

it('renders without crashing', () => {
  shallow(<SignupFormContainer signup={fakeSignupSuccess} />);
});

it('reset message on change', () => {
  const wrapper = shallow(<SignupFormContainer signup={fakeSignupSuccess} />);
  const instance = wrapper.instance()
  instance.state.message = 'message'
  expect(instance.state.message).toBe('message')
  instance.onChange()
  expect(instance.state.message).toBe('')
})

it('set token when signup success', async () => {
  const wrapper = shallow(<SignupFormContainer signup={fakeSignupSuccess} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(auth.setToken).toBeCalledWith('token')
})

it('set specific error message when signup failed', async () => {
  const wrapper = shallow(<SignupFormContainer signup={fakeSignupFailed} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('message')
})

it('set generic error message when signup failed', async () => {
  const fakeSignupGenericFailed = jest.fn(() => Promise.resolve({
    success: false
  }))
  const wrapper = shallow(<SignupFormContainer signup={fakeSignupGenericFailed} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('Something went wrong')
})
