import { SHOW_MODAL, CLOSE_MODAL } from "../actionTypes/authModal";

let initialState = {
  show: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return true;

    case CLOSE_MODAL:
      return false;

    default:
      return initialState;
  }
}
