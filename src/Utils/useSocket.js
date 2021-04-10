import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { useSelector } from "react-redux";

// const socket = io();

export default function useSocket(cb) {
    const [activeSocket, setActiveSocket] = useState(null);
    const user = useSelector((state) => state.auth_user.user);

    useEffect(() => {
        // console.log('updated usesocket')
        // // debug("Socket updated", { socket, activeSocket });
        // if (activeSocket || !socket) return;
        // cb && cb(socket);
        // setActiveSocket(socket);
        // return function cleanup() {
        //     // debug("Running useSocket cleanup", { socket });
        //     socket.off(`message.chat${user.id}`, cb);
        // };
    }, [ user]);

    return activeSocket;
}