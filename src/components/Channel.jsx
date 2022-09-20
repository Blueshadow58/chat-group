import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import Message from "./Message";
import { Button, Form, Stack } from "react-bootstrap";
import NavBar from "./NavBar";

const Channel = ({ user = null, db = null, signOut = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          //Get all the data
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //updateState
          setMessages(data);
        });
      //listener
      return unsubscribe;
    }
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
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

        <div
          style={{
            height: "83vh",
            overflow: "auto",
            paddingInline: "5vh",
          }}
        >
          {messages?.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>

        <div
          style={{
            height: "10vh",
            paddingInline: "5vh",
          }}
        >
          <form
            style={{ paddingTop: "3vh" }}
            className="align-center"
            onSubmit={handleOnSubmit}
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
              <Button
                variant="primary"
                type="submit"
                disabled={!newMessage}
                size="md"
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};

export default Channel;
