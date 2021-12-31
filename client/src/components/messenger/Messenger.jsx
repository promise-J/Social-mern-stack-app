import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from '../conversation/Conversation'
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from 'react-redux'


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [otherUser, setOtherUser] = useState(null)
  const [cb, setCb] = useState(false)
  const socket = useRef();
  const { user } = useSelector(state => state.auth)
  const scrollRef = useRef();
  const [loadingCon, setLoadingCon] = useState(false)

  useEffect(() => {
    socket.current = io();
    // socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoadingCon(true)
        const res = await axios.get("/api/conversation/" + user._id);
        setConversations(res.data);
        setLoadingCon(false)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id, cb]);
   
  //getting the other user Id
  useEffect(()=>{
     const receiverId = currentChat?.members?.find(
      (member) => member !== user._id
    );
    const getOtherUser = async()=>{
      const res = await axios.get(`/users?userId=${receiverId}`)
      setOtherUser(res.data)
    }
    getOtherUser()
  },[messages, conversations, currentChat?.members, user._id])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, cb]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {!loadingCon ? conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} cb={cb} setCb={setCb} currentUser={user} />
              </div>
            )) : <p>Loading...</p>}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
                currentChat &&
              <div className="chatDetailsDisplay">
                <h3 style={{fontStyle: 'italic'}}>{otherUser?.username}</h3>
                <img style={{width: '25px', height: '25px', borderRadius: '50%', marginLeft: '20px'}} alt='none' src={otherUser?.profilePic?.url} />
            </div>
            }
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message otherUser={otherUser} message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" disabled={!newMessage} onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
          <h2>Online friends</h2>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}