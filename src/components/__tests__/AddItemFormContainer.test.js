import React from 'react';
import { shallow } from 'enzyme';
import { AddItemFormContainer } from '../AddItemFormContainer';

const successData = {
  success: true,
  result: {
    data: {
      id: 1,
      name: 'name',
      description: 'description',
      price: 1.0,
      user_id: 1,
      created: 'created',
      updated: 'updated',
    }
  },
}
const addItemSuccess = jest.fn(() => Promise.resolve(successData))
const addItemFailed = jest.fn(() => Promise.resolve({
  success: false,
  error: {
    response: {
      data: {
        message: {key: ['message']},
      }
    }
  },
}))
const formSubmitEvent = {
  target: {
    name: {
      value: 'name'
    },
    description: {
      value: 'description'
    },
    price: {
      value: 1.0
    }
  },
  preventDefault: jest.fn()
}
const successProps = {
  addItem: addItemSuccess,
  onAddItemSuccess: jest.fn(),
  categoryId: 1,
  accessToken: 'token'
}
const failedProps = {
  addItem: addItemFailed,
  onAddItemSuccess: jest.fn(),
  categoryId: 1,
  accessToken: 'token'
}

it('renders without crashing', () => {
  shallow(<AddItemFormContainer {...successProps} />);
});

it('reset message on change', () => {
  const wrapper = shallow(<AddItemFormContainer {...successProps} />);
  const instance = wrapper.instance()
  instance.state.message = 'message'
  expect(instance.state.message).toBe('message')
  instance.onChange()
  expect(instance.state.message).toBe('')
})

it('call onAddItemSuccess when adding item success', async () => {
  const wrapper = shallow(<AddItemFormContainer {...successProps} />);
  const instance = wrapper.instance()
  instance.onSubmit(formSubmitEvent)
  await Promise.resolve();
  expect(successProps.onAddItemSuccess).toBeCalledWith(successData.result.data)
})

it('set specific error message when adding item failed', async () => {
  const wrapper = shallow(<AddItemFormContainer {...failedProps} />);
  const instance = wrapper.instance()
  instance.onSubmit(formSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('message')
})

it('set generic error message when adding item failed', async () => {
  const genericFailed = jest.fn(() => Promise.resolve({
    success: false
  }))
  const genericFailedProps = {
    addItem: genericFailed,
    onAddItemSuccess: jest.fn(),
    categoryId: 1,
    accessToken: 'token'
  }
  const wrapper = shallow(<AddItemFormContainer {...genericFailedProps} />);
  const instance = wrapper.instance()
  instance.onSubmit(formSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('Something went wrong')
})

it('render nothing if user not logged in yet', () => {
  const props = {
    addItem: addItemSuccess,
    onAddItemSuccess: jest.fn(),
    categoryId: 1,
    accessToken: null
  }
  const wrapper = shallow(<AddItemFormContainer {...props} />);
  expect(wrapper.find('AddItemForm').length).toBe(0)
})
