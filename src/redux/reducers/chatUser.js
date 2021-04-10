import { CHAT_AUTHENTICATED, CHAT_UNAUTHENTICATED, CHAT_UPDATE_USER } from "../actionTypes/chatUser";


export default function (currentUser = null, action) {
    switch (action.type) {
        case CHAT_AUTHENTICATED:
            
            return action.payload.currentUser

        case CHAT_UPDATE_USER: {
            const result = Object.assign(currentUser.user, action.payload.currentUser)
            currentUser.user = result
            return { ...currentUser }
        }
        case CHAT_UNAUTHENTICATED:
            return null;

        default:
            return currentUser;

    }
}
