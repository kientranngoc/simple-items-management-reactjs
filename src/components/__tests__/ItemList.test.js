import React from 'react';
import { shallow } from 'enzyme';
import ItemList from '../ItemList';

const props = {
  items: [
    {
      id: 1,
      name: 'name 1',
      description: 'description 1',
      price: 1.0,
      user_id: 1,
      created: 'created',
      updated: 'updated',
    },
    {
      id: 2,
      name: 'name 2',
      description: 'description 2',
      price: 2.0,
      user_id: 1,
      created: 'created',
      updated: 'updated',
    }
  ],
  userId: null,
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn()
}

it('renders without crashing', () => {
  shallow(<ItemList {...props} />);
});

it('contains a h2 element', () => {
  const wrapper = shallow(<ItemList {...props} />);
  expect(wrapper.contains(<h2>Item List</h2>)).toBe(true)
})

it('contains a 2 Item components', () => {
  const wrapper = shallow(<ItemList {...props} />);
  expect(wrapper.find('Item').length).toBe(2)
})
