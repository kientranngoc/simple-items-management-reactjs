import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AddItemForm from "./AddItemForm";
import { addItem } from "../actions/item";

class AddItemFormContainer extends React.Component {
  state = {
    message: "",
  };
  resetMessage = () => {
    this.setState({ message: "" });
  };
  // Class Properties , required for binding bind a function to a component instance
  onSubmit = (event) => {
    event.preventDefault();
    this.resetMessage();
    const accessToken = this.props.accessToken;
    const categoryId = this.props.categoryId;
    this.props
      .addItem(accessToken, categoryId, {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
      })
      .then((response) => {
        if (response.success) {
          const { onAddItemSuccess } = this.props;
          onAddItemSuccess(response.result.data);
        } else {
          const error = response.error;
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            const messages = Object.values(error.response.data.message).map(
              (value) => value[0]
            );
            this.setState({ message: messages.join(" ") });
          } else {
            this.setState({ message: "Something went wrong" });
          }
        }
      });
  };
  onChange = () => {
    this.resetMessage();
  };
  render() {
    if (this.props.accessToken) {
      return (
        <AddItemForm
          message={this.state.message}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      );
    } else {
      return null;
    }
  }
}

AddItemFormContainer.propTypes = {
  addItem: PropTypes.func.isRequired,
  onAddItemSuccess: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
};
const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});

export default connect(mapStateToProps, { addItem })(AddItemFormContainer);
