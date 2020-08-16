import React from 'react';
import { shallow } from 'enzyme';
import { CategoryDetail } from '../CategoryDetail';

const fetchItemsSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      items: [
        {
          id: 1,
          name: 'name',
          description: 'description',
          price: 1.0,
          user_id: 1,
          created: 'created',
          updated: 'updated',
        },
        {
          id: 2,
          name: 'name',
          description: 'description',
          price: 1.0,
          user_id: 1,
          created: 'created',
          updated: 'updated',
        }
    ]}
  },
}))
const fetchCategorySuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {
      id: 1,
      name: 'name',
      description: 'description',
      created: 'created',
      updated: 'updated',
    }
  },
}))
const deleteItemSuccess = jest.fn(() => Promise.resolve({
  success: true,
  result: {
    data: {}
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
  userId: 1,
  match: {
    params: {
      id: '1',
    },
  },
  fetchCategory: fetchCategorySuccess,
  fetchItems: fetchItemsSuccess,
  deleteItem: deleteItemSuccess,
}
const failedProps = {
  accessToken: 'token',
  userId: 1,
  match: {
    params: {
      id: '1',
    },
  },
  fetchCategory: callApiFailed,
  fetchItems: callApiFailed,
  deleteItem: callApiFailed,
}

it('renders without crashing', () => {
  shallow(<CategoryDetail {...successProps} />);
});

it('contains AddItemFormContainer component if logged in', () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  expect(wrapper.find('Connect(AddItemFormContainer)').length).toBe(1)
});

it('contains no AddItemFormContainer component if not logged in yet', () => {
  const notLoggedInProps = {...successProps, accessToken: null}
  const wrapper = shallow(<CategoryDetail {...notLoggedInProps} />);
  expect(wrapper.find('Connect(AddItemFormContainer)').length).toBe(0)
});

it('store category on mount', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  expect(instance.state.category).toBe(null)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.category.id).toBe(1)
})

it('store items on mount', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  expect(instance.state.items.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
})

it('not store category on mount if api call failed', async () => {
  const wrapper = shallow(<CategoryDetail {...failedProps} />);
  const instance = wrapper.instance()
  expect(instance.state.category).toBe(null)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.category).toBe(null)
})

it('not store category on mount if category id is invalid', async () => {
  const invalidMatchProps = {...successProps, match: {params: {id: '0'}}}
  const wrapper = shallow(<CategoryDetail {...invalidMatchProps} />);
  const instance = wrapper.instance()
  expect(instance.state.category).toBe(null)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.category).toBe(null)
})

it('not store items on mount if api call failed', async () => {
  const wrapper = shallow(<CategoryDetail {...failedProps} />);
  const instance = wrapper.instance()
  expect(instance.state.items.length).toBe(0)
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(0)
})

it('close modal resets active info', () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  instance.state.activeModal = 'activeModal'
  instance.state.activeItem = {}
  instance.onModelClose()
  expect(instance.state.activeModal).toBe(null)
  expect(instance.state.activeItem).toBe(null)
})

it('open edit item modal updates state correctly', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.activeModal).toBe(null)
  expect(instance.state.activeItem).toBe(null)
  instance.onEditClick(1)
  expect(instance.state.activeModal).toBe('editItemModal')
  expect(instance.state.activeItem.id).toBe(1)
})

it('delete item updates state correctly', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
  instance.onDeleteClick(instance.state.items[0].id)
  await Promise.resolve()
  expect(instance.state.items.length).toBe(1)
})

it('delete item failed do not update state', async () => {
  const itemDeletionFailedProps = {...successProps, deleteItem: callApiFailed}
  const wrapper = shallow(<CategoryDetail {...itemDeletionFailedProps} />);
  const instance = wrapper.instance()
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
  instance.onDeleteClick(instance.state.items[0].id)
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
})

it('edit item updates state correctly', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
  const updatedItem = {...instance.state.items[0], name: 'updated name'}
  instance.onUpdateItemSuccess(updatedItem)
  expect(instance.state.items[0].name).toBe('updated name')
})

it('add item updates state correctly', async () => {
  const wrapper = shallow(<CategoryDetail {...successProps} />);
  const instance = wrapper.instance()
  instance.componentDidMount()
  await Promise.resolve()
  expect(instance.state.items.length).toBe(2)
  const addedItem = {...instance.state.items[0], id: 3}
  instance.onAddItemSuccess(addedItem)
  expect(instance.state.items.length).toBe(3)
  expect(instance.state.items[2].id).toBe(3)
})
