import {
  PUSH_MESSAGE,
  SET_MESSAGES,
  DELETE_ALL_MESSAGES,
  LAZY_FETCH_MESSAGES,
  UPDATE_MESSAGES,
} from "../actionTypes/messages";
import { SELECTED_DIALOG } from "../actionTypes/selectedDialog";
import ConnectyCube from "connectycube";

import { lazyFetchMessages, updateStatusMessages } from "./reducer-function";

let initial_state = {
  dialog: {},
  messages: []
}

export default (messages = initial_state, action) => {

  switch (action.type) {
    case SET_MESSAGES: {
      const msgs = action.msgs;
      const dialog = action.dialog;
      return { dialog: dialog, messages: msgs };
    }

    // case SELECTED_DIALOG: {
    //   console.log(action)
    //   const dialog = action.dialog;
    //   return { ...messages, dialog: dialog };
    // }


    case PUSH_MESSAGE: {
      let msg = action.msg
      if (msg && msg.dialog_id == messages.dialog.connecty_dialog_id) {
        if (msg.notif) {
          const params = {
            read: 1,
            chat_dialog_id: msg.dialog_id
          };
          ConnectyCube.chat.message
            .update("", params)
            .then(result => {

            })
            .catch(error => { });
        }
        const msgs = messages.messages.concat(action.msg);
        return { ...messages, messages: msgs };
      } else {
        let userData = localStorage.getItem("user");
        userData = userData ? JSON.parse(userData) : "";
        if (userData) {
          var message = {
            app_id: process.env.ONESIGNAL_APP_ID,
            contents: { "en": "You recieved a new message." },
            filters: [
              { "field": "tag", "key": "user", "relation": "=", "value": userData.id },

            ]
          };
          fetch("https://onesignal.com/api/v1/notifications", {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Basic " + process.env.ONESIGNAL_REST_KEY,
            },
            method: "post",
            body: JSON.stringify(message),
            // body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw Error(`Request rejected with status ${response.status}`);
              }
            })
            .then((responseData) => {
              console.log("responseDatasadsad", responseData);
              return responseData;
            })
            .catch((error) => console.log("responseDatasadsad", error));
        }


      }
      return messages

    }

    case DELETE_ALL_MESSAGES: {

      return initial_state;
    }

    default:
      return initial_state;
  }
};
