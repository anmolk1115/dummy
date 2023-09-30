import { GET_AIRPORT } from "../actions/types";

const initialState = {
  Details: [],
};

function airportReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AIRPORT:
      return {
        ...state,
        Details: action?.payload,
      };
    default:
      return state;
  }
}

export default airportReducer;
