import React from 'react';
import { shallow } from 'enzyme';
import EditItemModal from '../EditItemModal';

const props = {
  activeModal: 'editItemModal',
  onClose: jest.fn(),
  onUpdateItemSuccess: jest.fn(),
  categoryId: 1,
  itemId: 1,
  name: 'name',
  description: 'description',
  price: 1
}

it('renders without crashing', () => {
  shallow(<EditItemModal {...props} />);
});

it('contains a Modal component', () => {
  const wrapper = shallow(<EditItemModal {...props} />);
  expect(wrapper.find('Modal').length).toBe(1)
})

it('contains a EditItemFormContainer component', () => {
  const wrapper = shallow(<EditItemModal {...props} />);
  expect(wrapper.find('Connect(EditItemFormContainer)').length).toBe(1)
})

it('contains a close button', () => {
  const wrapper = shallow(<EditItemModal {...props} />);  
  expect(wrapper.contains(<button type="button" onClick={props.onClose}>close</button>)).toBe(true)
})

it('triggers close button onCick event', () => {
  const wrapper = shallow(<EditItemModal {...props} />);
  const mockEvent = { target: {value: ''} }
  wrapper.find('button').simulate('click', mockEvent)
  expect(props.onClose.mock.calls.length).toBe(1)
})
