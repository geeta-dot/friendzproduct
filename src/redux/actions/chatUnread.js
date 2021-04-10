import { CHAT_UNREAD, CHAT_UNREAD_RESET } from "../actionTypes/chatUnread";

export const chatUnreadCount = (count) => ({
    type: CHAT_UNREAD,
    count: count
});
export const chatUnreadReset = () => ({
    type: CHAT_UNREAD_RESET,
});
