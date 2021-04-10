import React, { useEffect, useState, useRef } from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { makeStyles } from "@material-ui/core/styles";
import { commonStyles, desktopStyles, tabStyles, mobileStyles } from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMessage, fetchMessages, readAll } from "../../apis/chat-api";
import dialogs from "../../redux/reducers/dialogs";
import Message from "./Message";
import { AddToPhotosSharp } from "@material-ui/icons";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import ConnectyCube from "connectycube";
// import Loader from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllMessages,
  pushMessage,
  setMessages,
} from "../../redux/actions/messages";
// import useSocket from "../../Utils/useSocket";
import Messages from "./Messages";
import { selectedDialog } from "../../redux/actions/selectedDialog";
import {
  getSeller,
  sendChatUpdate,
  updateOpenStatus,
} from "../../apis/global-api";

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.up("md")]: tabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));
const ChatBox = ({
  selectedDialogVal,
  auth,
  goBack,
  dialogsArr,
  updateDialogSeenBySeller,
  deleteDialogSeenBySeller,
}) => {
  const classes = useStyles();
  const [loading, setloading] = useState(true);
  const [prevdialog, setprevdialog] = useState({});
  const [data, setdata] = useState({});
  const [showConfirmBox, setshowConfirmBox] = useState(false);
  const [showConfirmLoader, setshowConfirmLoader] = useState(false);
  const [page, setpage] = useState(0);
  const [userMsg, setuserMsg] = useState("");
  const msgs = useSelector((state) => state.messages);
  // const socket = useSocket()
  // const [msgs, setmsgs] = useState([]);
  const [user, setuser] = useState("");
  const [title, settitle] = useState("");
  const [link, setlink] = useState("");
  const [chatType, setchatType] = useState("");
  const [connected, setconnected] = useState(false);

  const dispatch = useDispatch();

  const chatBoxREf = useRef("");

  useEffect(() => {
    if (!selectedDialogVal.id) {
      setloading(false);
      setuser("");
      settitle("");
      setlink("");
      setpage(0);

      return;
    }
    // if (prevdialog.id != selectedDialogVal.id) {
    // setloading(false);
    // setloading(true);

    setprevdialog(selectedDialogVal);
    getMessages(1);
    // }
    let dialog = selectedDialogVal;

    if (dialog && dialog.users.length) {
      let user = dialog.users.filter((item) => item.user.id != auth.id);
      user[0].user &&
        getSeller(user[0].user.id).then(
          (data) => data && data.id && setuser(data)
        );
      // setuser(user[0].user);
    }
    if (dialog && dialog.related_data) {
      let type = dialog.related;
      let related_data = dialog.related_data;

      let link = `/products/item/${related_data.id}`;
      if (type == "request") {
        link = `/buy-request`;
      }

      settitle(related_data.title);
      setlink(link);
      if (
        dialog.opened_by_seller == 0 &&
        dialog.related_data.seller_id == auth.id
      ) {
        setshowConfirmBox(true);
      }
    }
    // if (socket && auth && !connected) {
    //     socket.on(`message.chat${auth.id}`, message => {
    //         handleNewMsg(message)

    //     });
    //     setconnected(true)
    // }
  }, [selectedDialogVal]);

  const handleNewMsg = (message) => {
    // if (message.data && message.data.dialog_id == selectedDialogVal.id) {
    dispatch(pushMessage(message.data));
    //     console.log('message2', message.data.dialog_id == selectedDialogVal.id)
    //     // setmsgs(msgs.concat([message.data]))
    // }
    // console.log('message', message, selectedDialogVal)
  };

  const getMessages = (pageNo) => {
    setuserMsg("");
    let count = pageNo ? pageNo : page + 1;
    // return
    const dialogId = selectedDialogVal.connecty_dialog_id;
    let skip = (count - 1) * 10;
    const params = {
      chat_dialog_id: dialogId,
      sort_desc: "date_sent",
      limit: 10,
      skip: skip,
    };
    console.log("selectedDialogVal", selectedDialogVal);
    ConnectyCube.chat.message
      .list(params)
      .then((messages) => {
        if (messages.items.length) {
          let newMsgs = messages.items.reverse().concat(msgs.messages);
          setTimeout(() => {
            scrollToBottom(!msgs.messages.length ? "" : 30);
          }, 200);
          dispatch(setMessages(newMsgs, selectedDialogVal));
          setpage(count);
        } else if (!msgs.messages.length) {
          dispatch(setMessages([], selectedDialogVal));
          if (count == 1) {
            setuserMsg(
              selectedDialogVal.related == 'product'
                ? 'Do you still have this product?'
                : 'Do you still have this request'
            );
          }
          setpage(-1);
        }

        ConnectyCube.chat
          .getLastUserActivity(userId)
          .then((result) => {
            console.log("lastactive", result);
            const userId = result.userId;
            const seconds = result.seconds;
            // 'userId' was 'seconds' ago
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  // const getMessages = (data, msgs = []) => {
  //     // return
  //     if (!msgs.length) {
  //         dispatch(deleteAllMessages())

  //     }

  //     let count = 1;
  //     if (data && data.current_page) {
  //         count = data.current_page + 1;
  //     }
  //     let q = `?page=${count}`;
  //     let dialog = selectedDialogVal;
  //     if (!dialog) {
  //         setloading(false);
  //         return;
  //     }

  //     fetchMessages(dialog.id, q).then((data) => {
  //         if (data && data.data) {
  //             let newMsgs = data.data.reverse()
  //             let msgData = newMsgs.concat(msgs);
  //             dispatch(setMessages(msgData, selectedDialogVal))
  //             console.log('testcount', count, msgData.length, selectedDialogVal.related)
  //             if (count == 1 && !msgData.length) {
  //                 setuserMsg(selectedDialogVal.related == 'product' ? 'Do you still have this product?' : '')
  //             }
  //             // setmsgs(msgData);
  //             setdata(data);
  //         }

  //         if (!msgs.length) {
  //             setTimeout(() => {

  //                 scrollToBottom()

  //             }, 200);
  //         } else {
  //             scrollToBottom(30)
  //         }

  //         // readAll(dialog.id, auth.id).then(data => console.log(data))

  //     });
  // };

  const scrollToBottom = (height = "") => {
    setloading(false);
    if (!chatBoxREf || !chatBoxREf.current) {
      return;
    }

    chatBoxREf.current.scrollTop = height
      ? height
      : chatBoxREf.current.scrollHeight;
    // chatBoxREf.current.scrollTop = chatBoxREf.current.scrollHeight
  };

  const handleChatBoxScroll = (e) => {
    let target = e.target;
    if (!msgs.messages.length || page < 0) {
      return;
    }
    if (!target.scrollTop) {
      // setdialogLoader(true)
      // getDialogs();
      getMessages();
    }
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (!userMsg) {
      return;
    }
    let dialog = selectedDialogVal;
    const date = Math.floor(Date.now() / 1000);
    let message = {
      type: "groupchat",
      body: userMsg,
      message: userMsg,
      dialog_id: dialog.connecty_dialog_id,
      extension: {
        save_to_history: 1,
        dialog_id: dialog.connecty_dialog_id,
        // sender_id: '2066645',
        sender_id: auth.connectycube_user.connectycube_id,
        date_sent: date,
      },
      markable: 1,
      sender_id: auth.connectycube_user.connectycube_id,
    };
    dispatch(pushMessage(message));

    // setmsgs(msgs.concat([data]))
    setuserMsg("");
    message.id = ConnectyCube.chat.helpers.getBsonObjectId();

    message = ConnectyCube.chat.send(dialog.xmpp_room_jid, message);
    ConnectyCube.chat
      .getLastUserActivity(user.connectycube_user.connectycube_id)
      .then((result) => {
        console.log("resultconect", result);
        const userId = result.userId;
        const seconds = result.seconds;
        if (seconds > 500) {
          sendChatUpdate(user.id);
          var message = {
            app_id: process.env.ONESIGNAL_APP_ID,
            contents: { en: "You recieved a new message." },
            filters: [
              { field: "tag", key: "user", relation: "=", value: user.id },
            ],
            url: process.env.APP_URL + "/chat",
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
        // 'userId' was 'seconds' ago
      })
      .catch((error) => {});

    setTimeout(() => {
      scrollToBottom();
    }, 200);
  };

  const handleResponse = (status) => {
    setshowConfirmLoader(true);
    updateOpenStatus(selectedDialogVal.id, status,auth.id).then((resp) => {
      console.log(resp);
      setshowConfirmLoader(false);
      if (status == "yes") {
        setshowConfirmBox(false);
        updateDialogSeenBySeller(selectedDialogVal, dialogsArr);
      } else {
        deleteDialogSeenBySeller(selectedDialogVal, dialogsArr);
      }
    });
  };

  // const sendMsg = (e) => {
  //     e.preventDefault()
  //     if (!userMsg) {
  //         return
  //     }
  //     let data = {
  //         dialog_id: selectedDialogVal.id,
  //         user_id: auth.id,
  //         message: userMsg,
  //         created_at: new Date().toISOString()
  //     }
  //     dispatch(pushMessage(data))

  //     // setmsgs(msgs.concat([data]))
  //     setuserMsg('')
  //     createMessage(data)
  //         .then(resp => {
  //             // console.log(resp)
  //         })
  //         .catch((err) => console.log(err))

  //     socket.emit("sendmessage", {
  //         user: `message.chat${user.id}`,
  //         type: 'message',
  //         data: data
  //     });

  //     // console.log(userMsg)

  // }
  if (!selectedDialogVal.id) {
    return (
      <div className="right">
        <div className="top"></div>
        <div className="chat">
          {!loading && !dialogsArr.length && (
            <div className="emptyDialog">
              <img src="/static/images/undraw_typing.svg" />
              <Typography>Your message box is empty</Typography>
            </div>
          )}
          {!loading && dialogsArr.length > 0 && (
            <div className="emptyDialog">
              <Typography>Please select a dialog to start chat</Typography>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="right">
      <div className="top">
        <div className={classes.flex}>
          <KeyboardBackspaceIcon className={classes.backBtn} onClick={goBack} />
          <span>
            To:{" "}
            <span className="name">
              {user.first_name} {user.last_name}
            </span>
          </span>
        </div>
        {link ? (
          <p>
            <a href={link}>{title}</a>
          </p>
        ) : (
          <p>{title}</p>
        )}
      </div>
      <div className="chat" onScroll={handleChatBoxScroll} ref={chatBoxREf}>
        {loading && (
          <div className="emptyDialog">
            <CircularProgress color="primary" size={30} />
          </div>
        )}
        <Messages auth={auth} />
        {/* {msgs.messages.length > 0 && (
                    <>
                        {console.log('logged',msgs.messages)}
                        {msgs.messages.map((msg, index) => <Message message={msg} auth={auth} key={index} />)
                        }</>
                )} */}
      </div>
      <div className="write">
        {!loading && (
          <>
            <a href="javascript:;" className="test"></a>
            <input
              type="text"
              name="chatmessage"
              id="chatmessage"
              value={userMsg}
              // className={classes.vHide}
              onChange={(e) => setuserMsg(e.target.value)}
            />
            {/* <a href="javascript:;" className="write-link smiley"></a> */}
            <a
              href="javascript:;"
              className="write-link send"
              onClick={sendMsg}
            ></a>
          </>
        )}
      </div>
      {showConfirmBox && (
        <div className="confirm-availability">
          <Typography variant="h6">
            Please Confirm if this product is a valid product
          </Typography>
          {link ? (
            <p>
              <a href={link}>{title}</a>
            </p>
          ) : (
            <p>{title}</p>
          )}
          {!showConfirmLoader && (
            <div className="buttons">
              <Button
                size="large"
                color="primary"
                variant="contained"
                style={{ marginRight: 5 }}
                onClick={() => handleResponse("yes")}
              >
                Yes
              </Button>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                onClick={() => handleResponse("no")}
              >
                No
              </Button>
            </div>
          )}
          {showConfirmLoader && <CircularProgress color="primary" size={30} />}
          <p className="info">By clicking on 'Yes', you can continue to chat</p>
          <p className="info">
            By clicking on 'No', the product will be automatically deleted.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
