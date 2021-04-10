import { CHAT_CONNECTED, CHAT_RESET } from "../actionTypes/chatConnected";


export default function (state = false, action) {
    switch (action.type) {
        case CHAT_CONNECTED:
            return true;

        case CHAT_RESET:
            return false;

        default:
            return false;
    }
}
