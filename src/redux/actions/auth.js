import { UNAUTHENTICATED, AUTHENTICATED, UPDATE_DEVICE_TOKEN } from "../actionTypes/auth";

export const authenticated = (user, accessToken,userFavEvents,userFavProducts) => ({
  type: AUTHENTICATED,
  payload: { user, accessToken, userFavEvents , userFavProducts },
});
export const updateUserDeviceToken = (token) => ({
  type: UPDATE_DEVICE_TOKEN,
  payload: { token },
});

export const unauthenticated = () => ({
  type: UNAUTHENTICATED,
});
