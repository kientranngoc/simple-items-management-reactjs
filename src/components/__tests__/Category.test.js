import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Category from '../Category';

const props = {
  name: 'name',
  description: 'description',
  url: '/categories/1',
  created: 'created',
  updated: 'updated',
}

it('renders without crashing', () => {
  shallow(<Category {...props} />);
});

it('contains a h2 element', () => {
  const wrapper = shallow(<Category {...props} />);
  expect(wrapper.find('h2').length).toBe(1)
})

it('contains a Link component', () => {
  const wrapper = shallow(<Category {...props} />);
  expect(wrapper.contains(<Link to={props.url}>{props.name}</Link>)).toBe(true)
})

it('contains a description', () => {
  const wrapper = shallow(<Category {...props} />);
  expect(wrapper.contains(<span>{props.description}</span>)).toBe(true)
})

it('contains a created', () => {
  const wrapper = shallow(<Category {...props} />);
  expect(wrapper.contains(<span>{props.created}</span>)).toBe(true)
})

it('contains a updated', () => {
  const wrapper = shallow(<Category {...props} />);
  expect(wrapper.contains(<span>{props.updated}</span>)).toBe(true)
})
