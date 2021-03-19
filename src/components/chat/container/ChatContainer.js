import React from "react";
import Message from "../message/Message";
import "./Chat.css";
import { InputMessage } from "./input/InputMessage";

export const ChatContainer = ({
  room,
  messages,
  name,
  message,
  setMessage,
  sendMessage,
  users,
}) => {
  return (
    <div>
      <div className="container">
        <header className="header">{room}</header>

        <aside className="aside">
          <h2>Participants</h2>

          <ul>
            {users.length &&
              users.map((user) => <li key={user.id}>{user.name}</li>)}
          </ul>
        </aside>

        <main className="main">
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} name={name} />
            </div>
          ))}
        </main>
        <footer className="footer">
          {" "}
          <InputMessage
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </footer>
      </div>
    </div>
  );
};
