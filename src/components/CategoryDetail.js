import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserPanelContainer from "./UserPanelContainer";
import ItemList from "./ItemList";
import AddItemFormContainer from "./AddItemFormContainer";
import { fetchCategory } from "../actions/category";
import { fetchItems } from "../actions/item";

class CategoryDetail extends React.Component {
  state = {
    category: null,
    items: [],
  };
  // Class Properties , required for binding bind a function to a component instance
  onEditClick = (itemId) => {
    console.log(itemId);
  };
  onDeleteClick = (itemId) => {
    console.log(itemId);
  };
  onAddItemSuccess = (item) => {
    console.log(this);
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
    return (
      <div>
        <UserPanelContainer />
        <h1>{this.state.category ? this.state.category.name : ""}</h1>
        {this.state.category ? (
          <AddItemFormContainer
            onAddItemSuccess={this.onAddItemSuccess}
            categoryId={this.state.category.id}
          />
        ) : (
          ""
        )}
        <ItemList
          items={this.state.items}
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

CategoryDetail.propTypes = {
  match: PropTypes.object.isRequired,
  fetchCategory: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export default connect(null, { fetchCategory, fetchItems })(CategoryDetail);
