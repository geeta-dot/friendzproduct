import {
  SET_MESSAGES,
  PUSH_MESSAGE,
  DELETE_ALL_MESSAGES,
  LAZY_FETCH_MESSAGES,
  UPDATE_MESSAGES,
} from "../actionTypes/messages";

export const setMessages = (msgs, dialog) => ({
  type: SET_MESSAGES,
  msgs,
  dialog
});
export const lazyFetchMessages = (dialogId, history) => ({
  type: LAZY_FETCH_MESSAGES,
  dialogId,
  history,
});
export const updateMessages = (dialogId, msgId, msg) => ({
  type: UPDATE_MESSAGES,
  dialogId,
  msgId,
  msg,
});
export const pushMessage = ( msg) => ({
  type: PUSH_MESSAGE,
  msg
});
export const deleteAllMessages = () => ({
  type: DELETE_ALL_MESSAGES,
});
