import React from 'react';
import { shallow } from 'enzyme';
import { EditItemFormContainer } from '../EditItemFormContainer';

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
const editItemSuccess = jest.fn(() => Promise.resolve(successData))
const editItemFailed = jest.fn(() => Promise.resolve({
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
  updateItem: editItemSuccess,
  onUpdateItemSuccess: jest.fn(),
  categoryId: 1,
  itemId: 1,
  accessToken: 'token'
}
const failedProps = {
  updateItem: editItemFailed,
  onUpdateItemSuccess: jest.fn(),
  categoryId: 1,
  itemId: 1,
  accessToken: 'token'
}

it('renders without crashing', () => {
  shallow(<EditItemFormContainer {...successProps} />);
});

it('reset message on change', () => {
  const wrapper = shallow(<EditItemFormContainer {...successProps} />);
  const instance = wrapper.instance()
  instance.state.message = 'message'
  expect(instance.state.message).toBe('message')
  instance.onChange()
  expect(instance.state.message).toBe('')
})

it('call onUpdateItemSuccess when adding item success', async () => {
  const wrapper = shallow(<EditItemFormContainer {...successProps} />);
  const instance = wrapper.instance()
  instance.onSubmit(formSubmitEvent)
  await Promise.resolve();
  expect(successProps.onUpdateItemSuccess).toBeCalledWith(successData.result.data)
})

it('set specific error message when adding item failed', async () => {
  const wrapper = shallow(<EditItemFormContainer {...failedProps} />);
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
    updateItem: genericFailed,
    onUpdateItemSuccess: jest.fn(),
    categoryId: 1,
    itemId: 1,
    accessToken: 'token'
  }
  const wrapper = shallow(<EditItemFormContainer {...genericFailedProps} />);
  const instance = wrapper.instance()
  instance.onSubmit(formSubmitEvent)
  await Promise.resolve();
  expect(instance.state.message).toBe('Something went wrong')
})

it('render nothing if user not logged in yet', () => {
  const props = {
    updateItem: editItemSuccess,
    onUpdateItemSuccess: jest.fn(),
    categoryId: 1,
    itemId: 1,
    accessToken: null
  }
  const wrapper = shallow(<EditItemFormContainer {...props} />);
  expect(wrapper.find('EditItemForm').length).toBe(0)
})
