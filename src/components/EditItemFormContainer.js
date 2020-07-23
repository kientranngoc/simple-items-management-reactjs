import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import EditItemForm from './EditItemForm';
import { updateItem } from '../actions/item';

class EditItemFormContainer extends React.Component {
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
    const {
      accessToken, categoryId, itemId, onUpdateItemSuccess,
    } = props;
    props
      .updateItem(accessToken, categoryId, itemId, {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
      })
      .then((response) => {
        if (response.success) {
          onUpdateItemSuccess(response.result.data);
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
    const { message } = this.state;
    const {
      accessToken, name, description, price,
    } = this.props;
    if (accessToken) {
      return (
        <EditItemForm
          message={message}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={name}
          description={description}
          price={price}
        />
      );
    }
    return null;
  }
}

EditItemFormContainer.propTypes = {
  updateItem: PropTypes.func.isRequired,
  onUpdateItemSuccess: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number,
  accessToken: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

EditItemFormContainer.defaultProps = {
  itemId: null,
  accessToken: null,
  name: '',
  description: '',
  price: 0,
};

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});

export default connect(mapStateToProps, { updateItem })(EditItemFormContainer);
