import {
    CHAT_AUTHENTICATED,
    CHAT_UNAUTHENTICATED,
} from "../actionTypes/chatUser";


export default (currentUser = null, action) => {
    switch (action.type) {
        case CHAT_AUTHENTICATED:
            return action.currentUser

        case CHAT_UNAUTHENTICATED: {
            const result = Object.assign(currentUser.user, action.currentUser)
            currentUser.user = result
            return { ...currentUser }
        }

        // case RESET_CURRENT_USER:
        //     return null

        default:
            return currentUser
    }
}
