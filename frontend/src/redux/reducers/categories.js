import { DELETE_CATEGORY } from "../actions/categories";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATEGORY:
      const categoryId = action.payload;
      const updatedCategories = state.categories.filter(
        (category) => category.id !== categoryId
      );
      return {
        ...state,
        categories: updatedCategories,
      };
    // other cases...
    default:
      return state;
  }
};
