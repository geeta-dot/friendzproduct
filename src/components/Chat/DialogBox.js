import React, { useState, useEffect } from 'react'
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { selectedDialog } from '../../redux/actions/selectedDialog';
// import dialogs from '../../redux/reducers/dialogs';
import ConnectyCube from "connectycube";

const DialogBox = ({ dialog, auth, selectDialog, dialogs, unread_messages_count }) => {
    const [user, setuser] = useState('')
    const [msg, setmsg] = useState('')
    const [title, settitle] = useState('')
    const [time, settime] = useState('')
    const [unread, setunread] = useState(0)
    const selectedDialogVal = useSelector((state) => state.selectedDialog);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!dialog) {
            return
        }
        if (dialog.related_data) {
            settitle(dialog.related_data.title)
        }
        // if (unread_messages_count) {
        //     setunread(unread_messages_count ? unread_messages_count:'')
        // }
        if (dialog.users.length) {
            let user = dialog.users.filter(item => item.user.id != auth.id)
            user[0] && setuser(user[0].user)
        }
        if (dialog.last_message) {
            setmsg(dialog.last_message)
        }

        getUnread(dialog.connecty_dialog_id)

    }, [dialog, unread_messages_count, dialogs])

    const getUnread = async (dialog_id) => {
        const params = { chat_dialog_ids: [dialog_id] };

        ConnectyCube.chat.message
            .unreadCount(params)
            .then(result => {
                setunread(result[dialog_id])
                console.log('resultunread', result[dialog_id], params)
            })
            .catch(error => { });
    }

    const gotoChat = () => {
        if (!dialog) {
            return
        }

        // dispatch(selectedDialog(dialog))
        selectDialog(dialog, dialogs)
    }

    const isSelected = selectedDialogVal && dialog && selectedDialogVal.id == dialog.id
    if (!user) {
        return null
    }
    return (

        <li onClick={gotoChat} className={`person ${isSelected ? 'selected' : ''}`}>
            <img
                src={user.profile_img ? user.profile_img : '/static/images/user-placeholder.png'}
                alt=""
            />
            <div className="imgRight">
                <span className="name">{user.first_name}</span>
                <span className="time">
                    {msg.created_at ? moment(msg.created_at).fromNow() : ''}
                </span>
                <span className="preview">{title}</span>
                {unread > 0 && <span className="unread-box">
                    <span className="unread">{unread}</span>
                </span>}
            </div>
        </li>
    )
}

export default DialogBox
