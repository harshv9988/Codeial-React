import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { getJwtToken } from "../helpers/utils";
import { APIUrls } from "../helpers/urls";

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);

    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        console.log("SEARCH data", data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
