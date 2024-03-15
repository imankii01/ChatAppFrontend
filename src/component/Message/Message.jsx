import React, { useState } from 'react';
import '../../App.css';

// User component to display user details
const User = ({ name, status, time, onClick }) => (
  <li className="person" onClick={onClick}>
    <div className="user">
      <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="User" />
      <span className={`status ${status}`} />
    </div>
    <p className="name-time">
      <span className="name">{name}</span>
      <span className="time">{time}</span>
    </p>
  </li>
);

// Message component to display chat messages
const ChatMessage = ({ name, text, time, isSelf }) => (
  <li className={`chat-${isSelf ? 'right' : 'left'}`}>
    {!isSelf && (
      <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="User" />
        <div className="chat-name">{name}</div>
      </div>
    )}
    <div className="chat-text">{text}</div>
    <div className="chat-hour">
      {time} <span className="fa fa-check-circle" />
    </div>
  </li>
);

const Message = () => {
  // Dummy user and message data
  const [users] = useState([
    { id: 1, name: 'Steve Bangalter', status: 'busy', time: '15/02/2019' },
    { id: 2, name: 'Jane Smith', status: 'offline', time: '15/02/2019' },
    { id: 3, name: 'Peter Gregor', status: 'away', time: '12/02/2019' },
    { id: 4, name: 'Jessica Larson', status: 'busy', time: '11/02/2019' },
    { id: 5, name: 'Lisa Guerrero', status: 'offline', time: '08/02/2019' },
    { id: 6, name: 'Michael Jordan', status: 'away', time: '05/02/2019' },
  ]);

  const [messages] = useState([
    { id: 1, name: 'Russell', text: "Hello, I'm Russell. How can I help you today?", time: '08:55', isSelf: false },
    { id: 2, name: 'Sam', text: 'Hi, Russell. I need more information about Developer Plan.', time: '08:56', isSelf: true },
    // Add more message data as needed
  ]);

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
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card m-0">
              <div className="row no-gutters">
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
                      {users.map(user => (
                        <User
                          key={user.id}
                          name={user.name}
                          status={user.status}
                          time={user.time}
                          onClick={() => console.log(`Selected user: ${user.name}`)}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                  <div className="selected-user">
                    <span>
                      To: <span className="name">Emily Russell</span>
                    </span>
                  </div>
                  <div className="chat-container">
                    <ul className="chat-box chatContainerScroll">
                      {messages.map(message => (
                        <ChatMessage
                          key={message.id}
                          name={message.name}
                          text={message.text}
                          time={message.time}
                          isSelf={message.isSelf}
                        />
                      ))}
                    </ul>
                    <div className="form-group mt-3 mb-0">
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Type your message here..."
                        defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
