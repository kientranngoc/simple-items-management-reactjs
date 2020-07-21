import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserPanelContainer from "./UserPanelContainer";
import ItemList from "./ItemList";
import AddItemFormContainer from "./AddItemFormContainer";
import { fetchCategory } from "../actions/category";
import { fetchItems, deleteItem } from "../actions/item";
import EditItemModal from "./EditItemModal";

class CategoryDetail extends React.Component {
  state = {
    category: null,
    items: [],
    activeModal: null,
    activeItem: null,
  };
  // Class Properties , required for binding bind a function to a component instance
  onModelClose = () => {
    this.setState((state) => ({
      ...state,
      activeModal: null,
      activeItem: null,
    }));
  };
  onEditClick = (itemId) => {
    this.setState((state) => ({
      ...state,
      activeModal: "editItemModal",
      activeItem: state.items.filter((item) => item.id === itemId)[0],
    }));
  };
  onDeleteClick = (itemId) => {
    const categoryId = this.props.match.params.id;
    this.props
      .deleteItem(this.props.accessToken, categoryId, itemId)
      .then((response) => {
        if (response.success) {
          this.setState((state) => ({
            ...state,
            items: state.items.filter((item) => item.id !== itemId),
          }));
        }
      });
  };
  onUpdateItemSuccess = (updatedItem) => {
    this.setState((state) => {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      };
    });
  };
  onAddItemSuccess = (item) => {
    this.setState((state) => {
      return {
        ...state,
        items: [...state.items, item],
      };
    });
  };
  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId > 0) {
      this.props.fetchCategory(categoryId).then((response) => {
        if (response.success) {
          this.setState((state) => ({
            ...state,
            category: response.result.data,
          }));
        }
      });
      // TODO: Pagination
      this.props
        .fetchItems(categoryId, { offset: 0, limit: 100 })
        .then((response) => {
          this.setState((state) => ({
            ...state,
            items: response.result.data.items,
          }));
        });
    }
  }
  render() {
    const categoryId = parseInt(this.props.match.params.id);
    const { id, name, description, price } = this.state.activeItem || {
      id: null,
      name: null,
      description: null,
      price: null,
    };
    return (
      <div>
        <UserPanelContainer />
        <h1>{this.state.category ? this.state.category.name : ""}</h1>
        {this.props.accessToken ? (
          <AddItemFormContainer
            onAddItemSuccess={this.onAddItemSuccess}
            categoryId={categoryId}
          />
        ) : (
          ""
        )}
        <ItemList
          items={this.state.items}
          userId={this.props.userId}
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
        <EditItemModal
          activeModal={this.state.activeModal}
          onClose={this.onModelClose}
          categoryId={categoryId}
          itemId={id}
          name={name}
          description={description}
          price={price}
          onUpdateItemSuccess={this.onUpdateItemSuccess}
        />
      </div>
    );
  }
}

CategoryDetail.propTypes = {
  accessToken: PropTypes.string,
  userId: PropTypes.number,
  match: PropTypes.object.isRequired,
  fetchCategory: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
  userId: user.info && user.info.id,
});

export default connect(mapStateToProps, {
  fetchCategory,
  fetchItems,
  deleteItem,
})(CategoryDetail);
