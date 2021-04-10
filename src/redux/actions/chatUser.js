import { CHAT_AUTHENTICATED, CHAT_UNAUTHENTICATED, CHAT_UPDATE_USER} from "../actionTypes/chatUser";

export const chatAuthenticated = (currentUser, accessToken) => ({
    type: CHAT_AUTHENTICATED,
    payload: { currentUser, accessToken },
});
export const chatUpdateUser = (currentUser, accessToken) => ({
    type: CHAT_UPDATE_USER,
    payload: { currentUser, accessToken },
});

export const chatUnauthenticated = () => ({
    type: CHAT_UNAUTHENTICATED,
});
