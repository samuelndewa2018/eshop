import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const statementsReducer = createReducer(initialState, {
  statementsCreateRequest: (state) => {
    state.isLoading = true;
  },
  statementsCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.statements = action.payload;
    state.success = true;
  },
  statementsCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all statements
  getAllStatementsRequest: (state) => {
    state.isLoading = true;
  },
  getAllStatementsSuccess: (state, action) => {
    state.isLoading = false;
    state.allStatements = action.payload;
  },
  getAllStatementsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
