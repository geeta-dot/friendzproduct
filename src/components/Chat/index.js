import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Dialog } from "@material-ui/core";
import { commonStyles, desktopStyles, mobileStyles } from "./styles";
import Link from "next/link";
import ConnectyCube from "connectycube";
import { useSelector, useDispatch } from "react-redux";
import store from "../../redux/store";
import PageLoader from "../PageLoader";
import { fetchDialogs } from "../../apis/chat-api";
import DialogBox from "./DialogBox";
import CircularProgress from "@material-ui/core/CircularProgress";
// import dialogs from "../../redux/reducers/dialogs";
import { selectedDialog } from "../../redux/actions/selectedDialog";
import ChatBox from "./ChatBox";
import { pushMessage } from "../../redux/actions/messages";

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

const Chat = ({ type = "", id = "" }) => {
  const selectedDialogVal = useSelector((state) => state.selectedDialog);
  const chatConnected = useSelector((state) => state.chatConnected);
  // const user = useSelector((state) => state.auth_user.user);
  const [dialogsArr, setDialogs] = useState([]);
  const [data, setdata] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [loader, setloader] = React.useState(true);
  const [dialogLoader, setdialogLoader] = React.useState(false);
  const user = useSelector((state) => state.auth_user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dialogsArr.length && chatConnected) {
      // setUpListeners()
      setloader(true);
      getDialogs(type, id);
    }
  }, [type, id, user, chatConnected]);

  // const setUpListeners = () => {
  //   ConnectyCube.chat.onMessageListener = onMessage;

  // }

  function onMessage(userId, message) {
    if (
      !user ||
      !user.connectycube_user ||
      userId == user.connectycube_user.connectycube_id
    ) {
      return;
    }
    console.log(message);
    message.message = message.body;
    message.device_token = user.device_token;
    message.notif = true;
    dispatch(pushMessage(message));
  }

  const getDialogs = (type, id) => {
    let count = 1;
    if (data && data.current_page >= data.last_page) {
      return;
    }
    if (data && data.current_page) {
      count = data.current_page + 1;
    }
    let q = `?page=${count}`;
    if ((type, id)) {
      q += `&type=${type}&id=${id}`;
    }
    fetchDialogs(user.id, q).then((resp) => {
      let data = resp.body;
      if (resp.error) {
        alert("Oops!! there was some problem while connecting");
        return;
      }
      let dialogs = dialogsArr.concat(data.data);
      setDialogs(dialogs);
      setdata(data);
      setloader(false);
      setdialogLoader(false);
      // if (!chatAuthenticated && dialogs.length) {
      //   selectDialog(dialogs[0], dialogs);
      // }
    });
  };

  const gotoChat = () => {
    setOpen(false);
  };

  const goBack = () => {
    setOpen(true);
    dispatch(selectedDialog({}));
    dispatch(pushMessage([]));
  };

  const handleDialogsSCroll = (e) => {
    if (!dialogsArr.length || data.current_page == data.last_page) {
      return;
    }
    let target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setdialogLoader(true);
      getDialogs();
    }
  };

  const selectDialog = (dialog, dialogs) => {
    setOpen(false);
    clearUnread(dialog.id, dialogs);
    dispatch(selectedDialog(dialog));
  };
  const updateDialogSeenBySeller = (dialog, dialogs) => {
    dialogs = dialogsArr.map((item) => {
      if (item.id == dialog.id) {
        item.opened_by_seller = true;
      }
      return item;
    });
    console.log("dialogsupdate", dialogs);
    setDialogs(dialogs);
  };
  const deleteDialogSeenBySeller = (dialog, dialogs) => {
    dialogs = dialogsArr.filter((item) => item.id != dialog.id);
    setDialogs(dialogs);
    dispatch(selectedDialog({}));
  };

  const clearUnread = (id, dialogsArr = []) => {
    let dialogs = dialogsArr.map((item) => {
      if (item.id == id) {
        item.unread_messages_count = 0;
      }
      return item;
    });
    setDialogs(dialogs);
  };

  const classes = useStyles();
  // if (!loader && !dialogsArr.length) {
  //   return (
  //     <div className={classes.wrapper}>
  //       <div className="container">
  //         <div className="emptyDialog">
  //           <img src="/static/images/undraw_typing.svg" />
  //           <Typography >

  //             Your message box is empty
  //           </Typography>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className={classes.wrapper}>
      <PageLoader loading={loader} />
      <div className="container">
        <div className={open == true ? "left" : "active left"}>
          <div className="top">
            <Typography variant="h4">Messages </Typography>
            {/* <input type="text" placeholder="Search" />
                <a href="javascript:;" className="search"></a> */}
          </div>
          <ul className="people" onScroll={handleDialogsSCroll}>
            {dialogsArr.length > 0 &&
              dialogsArr.map((dialog) => (
                <DialogBox
                  dialog={dialog}
                  key={dialog.id}
                  auth={user}
                  selectDialog={selectDialog}
                  dialogs={dialogsArr}
                  unread_messages_count={
                    dialog.unread_messages_count
                      ? dialog.unread_messages_count
                      : ""
                  }
                />
              ))}
            {dialogLoader && (
              <div className="dialog-loader">
                <CircularProgress color="primary" size={20} />
              </div>
            )}
          </ul>
        </div>
        {user && (
          <ChatBox
            dialogs={dialogsArr}
            selectedDialogVal={selectedDialogVal ? selectedDialogVal : {}}
            auth={user}
            goBack={goBack}
            dialogsArr={dialogsArr}
            updateDialogSeenBySeller={updateDialogSeenBySeller}
            deleteDialogSeenBySeller={deleteDialogSeenBySeller}
          />
        )}
        {/* {!selectedDialogVal && (
          <div className="right">
            <div className="top"></div>
            <div className="chat">

              {!loader && !dialogsArr.length && (
                <div className="emptyDialog">
                  <img src="/static/images/undraw_typing.svg" />
                  <Typography>Your message box is empty</Typography>
                </div>
              )}
              {!loader && dialogsArr.length && (
                <div className="emptyDialog">
                  <Typography>Please select a dialog to start chat</Typography>
                </div>
              )}

            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Chat;
