import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { readAll } from '../../apis/chat-api';
import Message from './Message';

const Messages = ({ auth }) => {
    const msgs = useSelector((state) => state.messages);
    const [msgsTest, setmsgsTest] = useState([])
    console.log(msgs)
    useEffect(() => {
       
        setmsgsTest(msgs.messages)

        // if (msgs.messages.length && auth) {
        //     let lastmsg = msgs.messages.slice(-1).pop()
        //     if (lastmsg.user_id != auth.id && !lastmsg.read) {
        //         // readAll(lastmsg.dialog_id, auth.id).then(data => console.log(data))
        //     }
        // }


    }, [msgs])
    return (
        <div>
            {msgsTest.length > 0 && (
                msgsTest.map((msg, index) => <Message message={msg} auth={auth} key={index} />)
            )}
        </div>
    )
}

export default Messages
