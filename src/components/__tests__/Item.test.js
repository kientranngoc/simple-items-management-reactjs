import React from 'react';
import { shallow } from 'enzyme';
import Item from '../Item';

const onDeleteClick = jest.fn((id) => id)
const onEditClick = jest.fn((id) => id)
const item = {
  id: 1,
  name: 'name',
  description: 'description',
  price: 1.0,
  created: 'created',
  updated: 'updated',
  isOwner: true,
  onDeleteClick: onDeleteClick,
  onEditClick: onEditClick
}
const itemComponent = <Item id={item.id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                created={item.created} 
                updated={item.updated} 
                isOwner={item.isOwner} 
                onDeleteClick={item.onDeleteClick} 
                onEditClick={item.onEditClick} />

it('renders without crashing', () => {
  shallow(itemComponent);
});

it('contains a name information', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.contains(<h2>{item.name}</h2>)).toBe(true)
})

it('contains a description information', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.contains(<span>{item.description}</span>)).toBe(true)
})

it('contains a price information', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.contains(<span>{item.price}</span>)).toBe(true)
})

it('contains a created information', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.contains(<span>{item.created}</span>)).toBe(true)
})

it('contains a updated information', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.contains(<span>{item.updated}</span>)).toBe(true)
})

it('contains an edit button if it\'s owner', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.find('button').get(0).props.children).toBe('Edit')
})

it('contains a delete button if it\'s owner', () => {
  const wrapper = shallow(itemComponent);
  expect(wrapper.find('button').get(1).props.children).toBe('Delete')
})

it('not contain any button if it\'s not owner', () => {
  const itemComponent2 = <Item id={item.id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                created={item.created} 
                updated={item.updated} 
                isOwner={ false } 
                onDeleteClick={item.onDeleteClick} 
                onEditClick={item.onEditClick} />
  const wrapper = shallow(itemComponent2);
  expect(wrapper.find('button').length).toBe(0)
})
