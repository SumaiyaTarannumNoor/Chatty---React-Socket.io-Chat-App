import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:2022");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ?
      (
      <div className="joinChatContainer">
        <img src="logo.png" alt="Logo" width="280" height="280" style={{marginLeft:"600px", marginTop:"30px"}}/>
        <h1>Join a Chat</h1>
        <div className="tooltip">
          <span class="tooltiptext">Ask Basic about this one</span>
          <div className="chatSpace">
            <input
              type="text"
              placeholder="Enter Your Name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <input className="boxText"
              type="text"
              placeholder="Enter Your Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <button class="join" onClick={joinRoom}>
            Join a room
          </button>
          </div>
          </div>)
          : (
          <Chat socket={socket} username={username} room={room} />
          )}
        </div>
     
  );
}

export default App;
