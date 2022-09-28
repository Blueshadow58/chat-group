import React, { useContext } from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import Message from "./Message";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import NavBar from "./NavBar";
import { ChannelContext } from "../context/ChannelContext";
import "./Channel.css";

const Channel = ({ user = null, db = null, signOut = null }) => {
  const { channel } = useContext(ChannelContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { uid, displayName, photoURL } = user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (db && channel.channelName) {
      const unsubscribe = db
        .collection("messages")
        .where("channelName", "==", channel.channelName)
        .limit(100)
        .onSnapshot((querySnapshot) => {
          //Get all the data
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const sortedDesc = data.sort(
            (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
          );

          //updateState
          setMessages(sortedDesc);
        });
      //listener
      return unsubscribe;
    }
  }, [channel, db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (db) {
      try {
        setLoading(true);
        await db.collection("messages").add({
          text: newMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          displayName,
          photoURL,
          channelName: channel.channelName,
        });
        setLoading(false);
        const divChatList = document.getElementById("chatList");
        divChatList.scrollTop = divChatList.scrollHeight;
      } catch (error) {
        console.log(error);
      }
    }
    setNewMessage("");
  };

  return (
    <>
      <div>
        <div
          style={{
            height: "7vh",
          }}
        >
          <NavBar user={user} signOut={signOut} />
        </div>

        <div id="chatList" className="chatList">
          {channel.channelName ? (
            messages.map((message) => <Message key={message.id} {...message} />)
          ) : (
            <div className="h-100  d-flex align-items-center justify-content-center">
              <span className="text-white ">No Chat Selected</span>
            </div>
          )}
        </div>

        <div className="inputMessagesSection">
          <form
            style={{ paddingTop: "3vh" }}
            className="align-center"
            onSubmit={handleOnSubmit}
            hidden={!channel.channelName}
          >
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                type="text"
                className="me-auto input-channel"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Ingresa tu mensaje aqui"
                size="md"
              />
              {!loading ? (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!newMessage}
                  size="md"
                >
                  Enviar
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              )}
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};

export default Channel;
