import React, { useEffect, useState, useRef } from "react";
import "./ChatBox.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  sendmessage,
  readmessage,
  deletemessage,
  updatemessage,
  editLocalMessage,
  updateStatus,
  updateLocalStatus,
} from "../../slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";

export default function ChatBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const receiver = location.state;

  const chats = useSelector((state) => state.chat.chats || []);

  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editChatId, setEditChatId] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const longPressTimer = useRef(null);

  // Load messages
  useEffect(() => {
    if (!receiver || !currentuser) return;
    dispatch(
      readmessage({
        sender: currentuser.email,
        receiver: receiver.email,
      })
    );
  }, [receiver, currentuser, dispatch]);

  // Auto scroll
  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [chats]);

  // Send or update message
  const sendMsg = async () => {
    if (!message.trim()) return;

    if (isEditing) {
      dispatch(editLocalMessage({ chatid: editChatId, newMessage: message }));
      await dispatch(
        updatemessage({
          sender: currentuser.email,
          receiver: receiver.email,
          chatid: editChatId,
          newMessage: message,
        })
      );
      setIsEditing(false);
      setEditChatId(null);
    } else {
      await dispatch(
        sendmessage({
          message,
          sender: currentuser.email,
          receiver: receiver.email,
          status: "sent",
        })
      );
    }
    setMessage("");
  };

  // Delete message
  const handleDelete = (chat) => {
    dispatch(
      deletemessage({
        sender: currentuser.email,
        receiver: receiver.email,
        chatid: chat.chatid,
      })
    );
  };

  // Edit message
  const handleEdit = (chat) => {
    setMessage(chat.message);
    setIsEditing(true);
    setEditChatId(chat.chatid);
  };

  // Long press logic
  const startLongPress = (chat) => {
    if (chat.sender !== currentuser.email) return;
    longPressTimer.current = setTimeout(() => handleEdit(chat), 600);
  };
  const endLongPress = () => clearTimeout(longPressTimer.current);

  // Status handling
  const handleStatusClick = (chat) => {
    if (chat.sender !== currentuser.email) return;
    dispatch(updateLocalStatus({ chatid: chat.chatid, status: "sent" }));
    dispatch(
      updateStatus({
        sender: currentuser.email,
        receiver: receiver.email,
        chatid: chat.chatid,
        status: "sent",
      })
    );
  };

  const handleStatusDoubleClick = (chat) => {
    if (chat.sender !== currentuser.email) return;
    dispatch(updateLocalStatus({ chatid: chat.chatid, status: "seen" }));
    dispatch(
      updateStatus({
        sender: currentuser.email,
        receiver: receiver.email,
        chatid: chat.chatid,
        status: "seen",
      })
    );
  };

  // Emoji handler
  const onEmojiClick = (emojiData) => setMessage((prev) => prev + emojiData.emoji);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="chat-user-avatar">{receiver.email[0].toUpperCase()}</div>
        <div className="chat-user-info">
          <h3>{receiver.email}</h3>
          <span className="status">online</span>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {chats.map((chat) => {
          const side = chat.sender === currentuser.email ? "message-right" : "message-left";

          const handleDoubleClick = () => {
            if (chat.sender === currentuser.email) handleDelete(chat);
          };

          return (
            <div
              key={chat.chatid}
              className={`chat-message ${side}`}
              onDoubleClick={handleDoubleClick} // double click to delete
              onMouseDown={() => startLongPress(chat)}
              onMouseUp={endLongPress}
              onMouseLeave={endLongPress}
              onTouchStart={() => startLongPress(chat)}
              onTouchEnd={endLongPress}
              onClick={() => handleStatusClick(chat)} // single click for status
            >
              <div className={`bubble ${side}`}>
                {chat.message}
                {chat.edited && <small className="edited">(edited)</small>}
                <div className="chat-meta">
                  <span className="timestamp">
                    {chat.createdAt
                      ? new Date(chat.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : ""}
                  </span>
                  {chat.sender === currentuser.email && (
                    <span className="status-text">
                      {chat.status === "seen"
                        ? "✔✔ Seen"
                        : chat.status === "delivered"
                        ? "✔✔ Delivered"
                        : "✔ Sent"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <button className="emoji-btn" onClick={() => setShowEmoji(!showEmoji)}>😁</button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button className="chat-send-btn" onClick={sendMsg}>
          {isEditing ? "Update" : "Send"}
        </button>
      </div>

      {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
    </div>
  );
}
