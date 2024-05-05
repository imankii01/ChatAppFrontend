import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

import { Avatar, Button, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../../redux/actions/user";
import {
  getMessageAction,
  sendMessageAction,
} from "../../../redux/actions/common";
import { reactUserId } from "../../Auth/tokenProvider";
export let isMobileView = window.innerWidth <= 768;

const ChatSystemModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [connectionData, setConnectionData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(null);
  const [inComingMessage, setInComingMessage] = useState([]);

  useEffect(() => {
    console.log(reactUserId());
    dispatch(getAllUser({ user_id: reactUserId() }));
  }, [dispatch]);

  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);

  useEffect(() => {
    const { data, loading, error } = getAllUserReducer;
    setLoading(loading);

    if (data && !loading && !error) {
      setConnectionData(data?.users);
      console.log(data?.users.length);
      if (!isMobileView) {
        console.log(data?.users);
        setSelectedUser(data?.users[0]); // Select the first user by default
      }
    } else if (!loading && error) {
      console.error("Error fetching connection list:", error);
    }
  }, [getAllUserReducer, isMobileView]);

  const getMessageReducer = useSelector((state) => state.getMessageReducer);

  useEffect(() => {
    const { loading, status, error, data } = getMessageReducer;
    if (!loading && data && !error) {
      setInComingMessage(data);
    } else if (!loading && error !== undefined) {
      console.warn("error in getChatMessageReducer API", error);
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

      setInComingMessage([
        ...inComingMessage,
        {
          message: sendingMessage,
          sender_id: reactUserId(),
          receiver_id: selectedUser?.user_id,
          created_at: utcDateString,
        },
      ]);
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
    // to get the updated message form Client side as a Reciver
    let intervalId;

    if (selectedUser) {
      const data = {
        receiver_id: selectedUser.user_id,
        sender_id: reactUserId(),
      };

      dispatch(getMessageAction(data));

      intervalId = setInterval(() => {
        dispatch(getMessageAction(data));
      }, 15000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedUser, dispatch]);

  useEffect(() => {
    console.log("selectedUser", selectedUser);
    console.log("isMobileView", isMobileView);
  }, [selectedUser]);

  return (
    <>
      {loading && (
        <div className="loader">
          <TailSpin ariaLabel="Loading..." color="#00BFFF" />
        </div>
      )}

      <div className="ant-col internal-page-layout ant-col-xs-24 ant-col-xs-offset-0 ant-col-md-24 ant-col-md-offset-0 ">
        <div className="ant-row container-children ">
          {!loading && (
            <div className="ant-col ant-col-xs-22 ant-col-xs-offset-1 ant-col-md-22 ant-col-md-offset-1 ant-col-xxl-16 ant-col-xxl-offset-1 ">
              <div className={`queries  ${isMobileView ? "" : "ant-row "}`}>
                <div className="ant-col ant-col-md-24 ">
                  <div className={` ${isMobileView ? "" : "ant-row "}`}>
                    {connectionData && connectionData.length > 0 ? (
                      <>
                        {isMobileView ? (
                          <>
                            {selectedUser ? (
                              <ChatBox
                                selectedUser={selectedUser}
                                inComingMessage={inComingMessage}
                                sendingMessage={sendingMessage}
                                setSendingMessage={setSendingMessage}
                                handleSendMessage={handleSendMessage}
                                messagesContainerRef={messagesContainerRef}
                                setSelectedUser={setSelectedUser}
                              />
                            ) : (
                              <ConnectionList
                                connectionData={connectionData}
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser}
                              />
                            )}
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Result
                          title="You don't have any connections at the moment. Please check your request page."
                          extra={
                            <Button
                              type="primary"
                              onClick={() =>
                                navigate(
                                  "/dashboard/communications/connections"
                                )
                              }
                            >
                              Check Request
                            </Button>
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSystemModule;

const ConnectionList = ({ connectionData, setSelectedUser, selectedUser }) => {
  return (
    <>
      <div
        id="el"
        className={`ant-col ${isMobileView ? "" : "ant-col-6"} query-listing`}
      >
        {connectionData?.map((item, index) => (
          <div className={` ${isMobileView ? "" : "ant-row "}`} key={index}>
            <div
              onClick={() => setSelectedUser(item)}
              className={`ant-col query-list-item ${selectedUser === item ? "active" : ""
                } ant-col-md-24 `}
            >
              {" "}
              <div className="ant-typography query-list-title-section ">
                <span className="ant-typography query-user-name ">
                  <Avatar
                    size={64}
                    icon={item?.profile_photo ? null : <UserOutlined />}
                    src={item?.profile_photo ? `${item?.profile_photo}` : null}
                  />
                </span>
                <span className="ant-typography query-user-name ">
                  {item?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
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
  const onClose = () => {
    setSelectedUser(null);
  };

  const renderMessages = () => {
    let currentDate = null;
    let messagesJSX = [];

    inComingMessage.forEach((item, index) => {
      const messageDate = new Date(item.created_at);
      const messageDateString = messageDate.toDateString();
      const timeString = messageDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const showDateSection = currentDate !== messageDateString;
      currentDate = messageDateString;

      messagesJSX.push(
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
            className={`d-flex ${item.sender_id === reactUserId() ? "justify-content-end" : ""
              }`}
          >
            <span
              className={`${item.sender_id === reactUserId()
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

    return messagesJSX;
  };
  return (
    <>
      <div
        className={`ant-col ${isMobileView ? "" : " ant-col-17 ant-col-offset-1 "
          }`}
      >
        <div className="user_profile " style={{ border: "1px solid#f1f1f1" }}>
          <div className="my-1 mx-2 pt-1 me-auto profile_name_status">
            {isMobileView ? (
              <span className="back_icon" onClick={onClose}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZ0lEQVR4nO2WMQqAQAwE5xMR/f9LrETRxit8jsdJbKwsNIK306UaWJYlIMR9GmABeoKlCdiBMUpqwOrSDWglfRLF+ypWTXsLs0uTjwW/F9sl6k7yCEyxo8J99PpMkeJTXhZuOC5RPRnBEDtxjsnsowAAAABJRU5ErkJggg==" />
              </span>
            ) : null}

            <Avatar
              size={64}
              icon={selectedUser.profile_photo ? null : <UserOutlined />}
              src={
                selectedUser.profile_photo
                  ? `${selectedUser?.profile_photo}`
                  : null
              }
            />
            <span style={{ marginLeft: "10px" }}>{selectedUser?.name}</span>
          </div>
        </div>
        <div className="messages_area" ref={messagesContainerRef}>
          {inComingMessage && inComingMessage.length > 0 ? (
            renderMessages()
          ) : (
            <div className="message_date_section text-center">
              {new Date().toDateString()}
            </div>
          )}
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
              disabled={sendingMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
