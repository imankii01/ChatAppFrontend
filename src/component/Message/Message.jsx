import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import { REACT_USER_ID } from '../../tokenProvider';

const Message = () => {
  const [users, setUsers] = useState([]);
  const [user_id, setUser_id] = useState(REACT_USER_ID);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    getUsers();
  }, []);

  // Function to fetch user data
  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/get-user-list/${user_id}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to fetch messages for a specific user
  const getMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/messages/${userId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to send a message
  const sendMessage = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/send-message`, {
        userId: selectedUser.id,
        message: newMessage,
      });
      setMessages([...messages, response.data.message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Function to handle message input change
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  // Function to handle user selection
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    getMessages(user.id);
  };

  return (
    <div className="container">
      <div className="page-title">
        <div className="row gutters">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h5 className="title">Chat App</h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="row gutters">
         {(users && users?.length > 0) ? (
          <>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
            <div className="users-container">
              <div className="chat-search-box">
                <div className="input-group">
                  <input className="form-control" placeholder="Search" />
                  <div className="input-group-btn">
                    <button type="button" className="btn btn-info">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
              <ul className="users">
                {users.map((user) => (
                  <li className="person" key={user.id} onClick={() => handleUserSelection(user)}>
                    <div className="user">
                      <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="User" />
                      <span className={`status ${user.status}`} />
                    </div>
                    <p className="name-time">
                      <span className="name">{user.name}</span>
                      <span className="time">{user.time}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            {selectedUser && (
              <div className="selected-user">
                <span>
                  To: <span className="name">{selectedUser.name}</span>
                </span>
              </div>
            )}
            <div className="chat-container">
              <ul className="chat-box chatContainerScroll">
                {messages.map((message) => (
                  <li key={message.id} className={`chat-${message.isSelf ? 'right' : 'left'}`}>
                    {!message.isSelf && (
                      <div className="chat-avatar">
                        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="User" />
                        <div className="chat-name">{message.name}</div>
                      </div>
                    )}
                    <div className="chat-text">{message.text}</div>
                    <div className="chat-hour">
                      {message.time} <span className="fa fa-check-circle" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="form-group mt-3 mb-0">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={handleInputChange}
                />
                <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
          </>
         ):(
          <h1>"NO data"</h1>
         )}
        </div>
      </div>
    </div>
  );
};

export default Message;
