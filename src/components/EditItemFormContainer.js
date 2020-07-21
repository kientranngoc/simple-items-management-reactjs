import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import EditItemForm from "./EditItemForm";
import { updateItem } from "../actions/item";

class EditItemFormContainer extends React.Component {
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
    const { accessToken, categoryId, itemId } = this.props;
    this.props
      .updateItem(accessToken, categoryId, itemId, {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
      })
      .then((response) => {
        if (response.success) {
          const { onUpdateItemSuccess } = this.props;
          onUpdateItemSuccess(response.result.data);
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
        <EditItemForm
          message={this.state.message}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={this.props.name}
          description={this.props.description}
          price={this.props.price}
        />
      );
    } else {
      return null;
    }
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
const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});

export default connect(mapStateToProps, { updateItem })(EditItemFormContainer);
