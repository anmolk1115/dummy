import axios from "axios";
import { GET_AIRPORT } from "./types";

export const airportActions = () => {
  return function (dispatch) {
    return axios
      .get("./resources/dummy-airport-list.json")
      .then((res) => {
        dispatch({
          type: GET_AIRPORT,
          payload: res?.data,
        });
      })
      .catch((err) => console.warn("error in getting airports data"));
  };
};
