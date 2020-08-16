import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddItemForm from './AddItemForm';
import { addItem } from '../actions/item';

export class AddItemFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  resetMessage = () => {
    this.setState({ message: '' });
  };

  // Class Properties , required for binding bind a function to a component instance
  onSubmit = (event) => {
    event.preventDefault();
    this.resetMessage();
    const { props } = this;
    const { accessToken, categoryId, onAddItemSuccess } = props;
    props
      .addItem(accessToken, categoryId, {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
      })
      .then((response) => {
        if (response.success) {
          onAddItemSuccess(response.result.data);
        } else {
          const { error } = response;
          if (
            error
            && error.response
            && error.response.data
            && error.response.data.message
          ) {
            const messages = Object.values(error.response.data.message).map(
              (value) => value[0],
            );
            this.setState({ message: messages.join(' ') });
          } else {
            this.setState({ message: 'Something went wrong' });
          }
        }
      });
  };

  onChange = () => {
    this.resetMessage();
  };

  render() {
    const { accessToken } = this.props;
    const { message } = this.state;
    if (accessToken) {
      return (
        <AddItemForm
          message={message}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      );
    }
    return null;
  }
}

AddItemFormContainer.propTypes = {
  addItem: PropTypes.func.isRequired,
  onAddItemSuccess: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  accessToken: PropTypes.string,
};
AddItemFormContainer.defaultProps = {
  accessToken: null,
};

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});

export default connect(mapStateToProps, { addItem })(AddItemFormContainer);
