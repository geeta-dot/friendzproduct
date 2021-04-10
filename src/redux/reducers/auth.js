import { UNAUTHENTICATED, AUTHENTICATED, UPDATE_DEVICE_TOKEN} from "../actionTypes/auth";
import localforage from 'localforage'
import { SELECTED_FILTER_RESET, SELECTED_FILTER_UNIVERSITY } from "../../constants";

const initialState = {
  user: {},
  accessToken: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      const { user, accessToken, userFavEvents, userFavProducts } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userFavEvents", userFavEvents);
      localStorage.setItem("userFavProducts", userFavProducts);
      localStorage.setItem(SELECTED_FILTER_RESET, false);
      return {
        ...state,
        user: user,
        accessToken: accessToken,
      };
    case UPDATE_DEVICE_TOKEN:
      let { token } = action.payload
      let u = state.user
      u.device_token = token
      localStorage.setItem("user", JSON.stringify(u));
      return {
        ...state,
        user: u,

      };


    case UNAUTHENTICATED:
      localStorage.setItem("user", "");
      localStorage.setItem("accessToken", "");
      localStorage.setItem("userFavEvents", "");
      localStorage.setItem("userFavProducts", "");
      localforage.removeItem('fcm_token')
      localforage.removeItem('fcm_token_user')
      localStorage.setItem(SELECTED_FILTER_UNIVERSITY, '');
      localStorage.setItem(SELECTED_FILTER_RESET, false);
      return initialState;

    default:
      let data = "";

      if (typeof window !== "undefined") {
        let userData = window.localStorage.getItem("user");
        userData = userData ? JSON.parse(userData) : "";
        let accessTokenData = window.localStorage.getItem("accessToken");
        let userFavEvents = window.localStorage.getItem("userFavEvents");
        let userFavProducts = window.localStorage.getItem("userFavProducts");
        accessTokenData =
          accessTokenData && accessTokenData != "undefined"
            ? accessTokenData
            : "";
        if (userData && accessTokenData) {
          data = {
            user: userData,
            accessToken: accessTokenData,
            userFavEvents: userFavEvents,
            userFavProducts: userFavProducts

          };
        }
      }

      return data ? data : initialState;
  }
}
