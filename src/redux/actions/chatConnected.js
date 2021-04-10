import { CHAT_CONNECTED, CHAT_RESET } from "../actionTypes/chatConnected";

export const chatConnection = () => ({
    type: CHAT_CONNECTED,
    // payload: { currentUser, accessToken },
});
export const chatReset = () => ({
    type: CHAT_RESET,
    // payload: { currentUser, accessToken },
});

// export const chatUnauthenticated = () => ({
//     type: CHAT_UNAUTHENTICATED,
// });
