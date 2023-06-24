import axios from "axios";
import { server } from "../../server";
// create statements
export const createStatements = () => async (dispatch) => {
  try {
    dispatch({
      type: "statementsCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/trial/create-statements`,

      config
    );
    dispatch({
      type: "statementsCreateSuccess",
      payload: data.statements,
    });
  } catch (error) {
    dispatch({
      type: "statementsCreateFail",
      payload: error.response.data.message,
    });
  }
};
// get all statements
export const getAllStatements = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllStatementsRequest",
    });

    const { data } = await axios.get(`${server}/statements/get-all-statements`);
    dispatch({
      type: "getAllStatementsSuccess",
      payload: data.statements,
    });
  } catch (error) {
    dispatch({
      type: "getAllStatementsFailed",
      payload: error.response.data.message,
    });
  }
};
