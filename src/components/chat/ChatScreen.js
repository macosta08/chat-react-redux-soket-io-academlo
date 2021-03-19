import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { ChatContainer } from "./container/ChatContainer";
//import ContainerChat from "./container/ContainerChat";

const ENDPOINT = "https://academlo-chat.herokuapp.com/";

let socket;
export const ChatScreen = ({ location }) => {
  // const { id, token, username } = location.state.dataUser.user;
  // const { room } = location.state;
  const { username, token } = useSelector((state) => state.auth.user);
  const room = useSelector((state) => state.auth.roomToJoin);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (token && username) {
      socket = io(ENDPOINT, {
        query: {
          token,
        },
      });

      socket.on("error", (err) => console.log(err));

      socket.emit("join", { name: username, room }, (error) => {
        if (error) {
          console.error(error);
        }
      });

      socket.on("message", (message) => {
        console.log(message);
        setMessages((messages) => [...messages, message]);
      });

      socket.on("roomData", ({ users }) => {
        console.log(users);
        setUsers(users);
      });
    }
  }, [token, room, username]);

  // useEffect(() => {

  // }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div>
      <ChatContainer
        room={room}
        messages={messages}
        name={username}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        users={users}
      />
    </div>
  );
};
