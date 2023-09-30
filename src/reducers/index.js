import { combineReducers } from "redux";
import airportReducer from "./airportReducer";

export default combineReducers({
  reducer: airportReducer,
});
