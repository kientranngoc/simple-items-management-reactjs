import React from 'react';
import { shallow } from 'enzyme';
import { SigninFormContainer } from '../SigninFormContainer';
import * as auth from '../../libs/utils/auth';

const fakeSigninSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      access_token: 'token',
    }
  },
}))
const fakeSigninFailed = jest.fn(() => Promise.resolve({
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
  shallow(<SigninFormContainer signin={fakeSigninSuccess} />);
});

it('reset message on change', () => {
  const wrapper = shallow(<SigninFormContainer signin={fakeSigninSuccess} />);
  const instance = wrapper.instance()
  instance.state.message = 'message'
  expect(instance.state.message).toBe('message')
  instance.onChange()
  expect(instance.state.message).toBe('')
})

it('set token when signin success', async () => {
  const wrapper = shallow(<SigninFormContainer signin={fakeSigninSuccess} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(auth.setToken).toBeCalledWith('token')
})

it('set specific error message when signin failed', async () => {
  const wrapper = shallow(<SigninFormContainer signin={fakeSigninFailed} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('message')
})

it('set generic error message when signin failed', async () => {
  const fakeSigninGenericFailed = jest.fn(() => Promise.resolve({
    success: false
  }))
  const wrapper = shallow(<SigninFormContainer signin={fakeSigninGenericFailed} />);
  const instance = wrapper.instance()
  instance.onSubmit(fakeFormSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('Something went wrong')
})
