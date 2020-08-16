import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from '../CategoryList';

const props = {
  categories: [
    {
      id: 1,
      name: 'name 1',
      description: 'description 1',
      created: 'created',
      updated: 'updated',
    },
    {
      id: 2,
      name: 'name 2',
      description: 'description 2',
      created: 'created',
      updated: 'updated',
    }
  ]
}

it('renders without crashing', () => {
  shallow(<CategoryList {...props} />);
});

it('contains a h2 element', () => {
  const wrapper = shallow(<CategoryList {...props} />);
  expect(wrapper.contains(<h2>Category List</h2>)).toBe(true)
})

it('contains a 2 Category components', () => {
  const wrapper = shallow(<CategoryList {...props} />);
  expect(wrapper.find('Category').length).toBe(2)
})

it('contains nothing if categories is empty', () => {
  const wrapper = shallow(<CategoryList categories={[]} />);
  expect(wrapper.find('Category').length).toBe(0)
})

it('contains nothing if categories is null', () => {
  const wrapper = shallow(<CategoryList categories={null} />);
  expect(wrapper.find('Category').length).toBe(0)
})
