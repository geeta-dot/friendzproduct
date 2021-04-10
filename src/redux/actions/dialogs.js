import {
  FETCH_DIALOGS,
  ADD_DIALOG,
  SORT_DIALOGS,
  UPDATE_DIALOG,
  DELETE_DIALOG,
} from "../actionTypes/dialogs";

export const fetchDialogs = (dialogs) => ({
  type: FETCH_DIALOGS,
  dialogs: dialogs,
});
export const updateDialog = (dialog) => ({ type: UPDATE_DIALOG, dialog });
export const addNewDialog = (dialog) => ({ type: ADD_DIALOG, dialog: dialog });
export const sortDialogs = (message, count) => ({
  type: SORT_DIALOGS,
  message: message,
  count: count,
});
export const deleteDialog = (dialogId) => ({ type: DELETE_DIALOG, dialogId });
