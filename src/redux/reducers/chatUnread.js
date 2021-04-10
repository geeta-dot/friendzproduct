import { CHAT_UNREAD_RESET, CHAT_UNREAD } from "../actionTypes/chatUnread";


export default function (state = 0, action) {
    switch (action.type) {
        case CHAT_UNREAD:
            return parseInt(action.count);

        case CHAT_UNREAD_RESET:
            return 0;

        default:
            return 0;
    }
}
