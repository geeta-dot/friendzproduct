import {
  SELECTED_DIALOG,
  UN_SELECTED_DIALOG,
} from "../actionTypes/selectedDialog";

export const selectedDialog = (dialog) => ({ type: SELECTED_DIALOG, dialog });
export const unSelectedDialog = (dialog) => ({
  type: UN_SELECTED_DIALOG,
  dialog,
});