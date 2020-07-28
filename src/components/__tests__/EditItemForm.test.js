import React from 'react';
import { shallow } from 'enzyme';
import EditItemForm from '../EditItemForm';

const onChange = jest.fn((event) => event.target.value)
const onSubmit = jest.fn((event) => event.target.value)
const message = 'message'
const item = {
  name: '',
  description: '',
  price: 0
}

it('renders without crashing', () => {
  shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} message={message} />);
});

it('contains a message span', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} message={message} />);
  expect(wrapper.contains(<span>{message}</span>)).toBe(true)
})

it('contains a name text input', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} name={item.name} />);
  expect(wrapper.contains(<input id="name" type="text" defaultValue={item.name} onChange={onChange} />)).toBe(true)
})

it('contains a description text input', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<input id="description" type="text" defaultValue={item.description} onChange={onChange} />)).toBe(true)
})

it('contains a price text input', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<input id="price" type="text" defaultValue={item.price} onChange={onChange} />)).toBe(true)
})

it('contains a submit button', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  expect(wrapper.contains(<button type="submit">Submit</button>)).toBe(true)
})

it('triggers name onChange event', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('#name').simulate('change', mockEvent)
  expect(onChange.mock.calls.length).toBe(1)
  expect(onChange.mock.results[0].value).toBe('')
})

it('triggers description onChange event', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('#description').simulate('change', mockEvent)
  expect(onChange.mock.calls.length).toBe(1)
  expect(onChange.mock.results[0].value).toBe('')
})

it('triggers price onChange event', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('#price').simulate('change', mockEvent)
  expect(onChange.mock.calls.length).toBe(1)
  expect(onChange.mock.results[0].value).toBe('')
})

it('triggers submit event', () => {
  const wrapper = shallow(<EditItemForm onChange={onChange} onSubmit={onSubmit} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('form').simulate('submit', mockEvent)
  expect(onSubmit.mock.calls.length).toBe(1)
  expect(onSubmit.mock.results[0].value).toBe('')
})