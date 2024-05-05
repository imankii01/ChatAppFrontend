import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMessageAction,
  sendMessageAction,
} from "../../../redux/actions/common";
import { getAllUser } from "../../../redux/actions/user";
import { reactUserId } from "../../Auth/tokenProvider";

const isMobileView = window.innerWidth <= 768;

const ChatSystemModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [connectionData, setConnectionData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sendingMessage, setSendingMessage] = useState("");
  const [inComingMessage, setInComingMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUser({ user_id: reactUserId() }));
  }, [dispatch]);

  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);
  const getMessageReducer = useSelector((state) => state.getMessageReducer);

  useEffect(() => {
    const { data, loading, error } = getAllUserReducer;
    setLoading(loading);

    if (data && !loading && !error) {
      setConnectionData(data);
      if (!isMobileView && !selectedUser) setSelectedUser(data[0]);
    } else if (!loading && error) {
      console.error("Error fetching connection list:", error);
    }
  }, [getAllUserReducer, selectedUser]);

  useEffect(() => {
    const { loading, status, error, data } = getMessageReducer;

    if (!loading && data && !error) {
      setInComingMessage(data);
    } else if (!loading && error !== undefined) {
      console.warn("Error in getChatMessageReducer API", error);
      setInComingMessage([]);
    } else {
      console.warn(error);
    }
  }, [getMessageReducer]);

  const handleSendMessage = () => {
    if (sendingMessage.trim() !== "") {
      const utcDateString = new Date().toISOString();
      const data = {
        message: sendingMessage,
        sender_id: reactUserId(),
        receiver_id: selectedUser?.user_id,
        time: utcDateString,
      };

      dispatch(sendMessageAction(data));
      setSendingMessage("");
    }
  };

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [inComingMessage]);

  useEffect(() => {
    let intervalId;

    if (selectedUser) {
      const data = {
        sender_id: selectedUser.user_id,
      };

      dispatch(getMessageAction(data));

      intervalId = setInterval(() => {
        dispatch(getMessageAction(data));
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedUser]);

  return (
    <>
      {loading && (
        <div className="loader">
          <TailSpin ariaLabel="Loading..." color="#00BFFF" />
        </div>
      )}

      <div className="ant-col internal-page-layout ant-col-xs-24 ant-col-xs-offset-0 ant-col-md-24 ant-col-md-offset-0">
        <div className="ant-row container-children">
          {!loading && (
            <div className="ant-col ant-col-xs-22 ant-col-xs-offset-1 ant-col-md-22 ant-col-md-offset-1 ant-col-xxl-16 ant-col-xxl-offset-1">
              <div className="row">
                <ConnectionList
                  connectionData={connectionData}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
                {selectedUser && (
                  <ChatBox
                    selectedUser={selectedUser}
                    inComingMessage={inComingMessage}
                    sendingMessage={sendingMessage}
                    setSendingMessage={setSendingMessage}
                    handleSendMessage={handleSendMessage}
                    messagesContainerRef={messagesContainerRef}
                    setSelectedUser={setSelectedUser}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ConnectionList = ({ connectionData, setSelectedUser, selectedUser }) => {
  return (
    <div id="el" className={`col-3`}>
      {connectionData?.map((item, index) => (
        <div
          className={` ant-row `}
          key={index}
          onClick={() => setSelectedUser(item)}
        >
          <div
            className={`ant-col query-list-item ${
              selectedUser === item ? "active" : ""
            } ant-col-md-24`}
          >
            <div className="ant-typography query-list-title-section">
              <span className="ant-typography query-user-name">
                <Avatar
                  size={64}
                  icon={item?.photo ? null : <UserOutlined />}
                  src={`${process.env.REACT_APP_IMAGES_BASE_URL}${item?.photo}`}
                />
              </span>
              <span className="ant-typography query-user-name">
                {`${item?.first_name} ${item?.last_name}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatBox = ({
  selectedUser,
  inComingMessage,
  sendingMessage,
  setSendingMessage,
  handleSendMessage,
  messagesContainerRef,
  setSelectedUser,
}) => {
  const renderMessages = () => {
    if (!inComingMessage || inComingMessage.length === 0) {
      return (
        <div className="message_date_section text-center">
          {new Date().toDateString()}
        </div>
      );
    }

    let currentDate = null;
    return inComingMessage.map((item, index) => {
      const messageDate = new Date(item.created_at);
      const messageDateString = messageDate.toDateString();
      const timeString = messageDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const showDateSection = currentDate !== messageDateString;
      currentDate = messageDateString;

      return (
        <div
          key={index}
          className={`message-container ${showDateSection ? "show-date" : ""}`}
        >
          {showDateSection && (
            <div className="message_date_section text-center">
              {messageDateString}
            </div>
          )}
          <div
            className={`d-flex ${
              item.sender_id === reactUserId() ? "justify-content-end" : ""
            }`}
          >
            <span
              className={`${
                item.sender_id === reactUserId()
                  ? "right_chat_message"
                  : "left_chat_message"
              } ${item.sender_id === reactUserId() ? "ms-auto" : "me-4"}`}
            >
              <p>{item.message}</p>
              <div className="message_time">{timeString}</div>
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="col">
      <div className="user_profile" style={{ border: "1px solid#f1f1f1" }}>
        <div className="my-1 mx-2 pt-1 me-auto profile_name_status">
          <Avatar
            size={64}
            icon={selectedUser.photo ? null : <UserOutlined />}
            src={`${process.env.REACT_APP_IMAGES_BASE_URL}${selectedUser?.photo}`}
          />
          <span
            style={{ marginLeft: "10px" }}
          >{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</span>
        </div>
      </div>
      <div className="messages_area" ref={messagesContainerRef}>
        {renderMessages()}
      </div>
      <div
        className="chat-container mt-2"
        style={{ border: "1px solid#f1f1f1" }}
      >
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={sendingMessage}
            onChange={(e) => setSendingMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="send_btn_icon"
            onClick={handleSendMessage}
            disabled={!sendingMessage.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystemModule;
