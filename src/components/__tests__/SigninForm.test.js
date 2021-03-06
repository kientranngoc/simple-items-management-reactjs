import React from 'react';
import { shallow } from 'enzyme';
import SigninForm from '../SigninForm';

const onChange = jest.fn((event) => event.target.value)
const onSubmit = jest.fn((event) => event.target.value)
const message = 'message'

it('renders without crashing', () => {
  shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} message={message} />);
});

it('contains a message span', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} message={message} />);
  expect(wrapper.contains(<span>{message}</span>)).toBe(true)
})

it('contains a username text input', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<input id="username" type="text" onChange={onChange} />)).toBe(true)
})

it('contains a password text input', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<input id="password" type="password" onChange={onChange} />)).toBe(true)
})

it('contains a submit button', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<button type="submit">Submit</button>)).toBe(true)
})

it('triggers username onChange event', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('#username').simulate('change', mockEvent)
  expect(onChange.mock.calls.length).toBe(1)
  expect(onChange.mock.results[0].value).toBe('')
})

it('triggers password onChange event', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('#password').simulate('change', mockEvent)
  expect(onChange.mock.calls.length).toBe(1)
  expect(onChange.mock.results[0].value).toBe('')
})

it('triggers submit event', () => {
  const wrapper = shallow(<SigninForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('form').simulate('submit', mockEvent)
  expect(onSubmit.mock.calls.length).toBe(1)
  expect(onSubmit.mock.results[0].value).toBe('')
})