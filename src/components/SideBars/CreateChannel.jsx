import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../lib/init-firebase";
import Spinner from "react-bootstrap/Spinner";
import { ChannelContext } from "../../context/ChannelContext";

const CreateChannel = (props) => {
  const [isLoading, setLoading] = useState(false);
  const { user } = useContext(ChannelContext);
  const { uid } = user;
  const [inputValidation, setInputValidation] = useState(false);

  const newChannel = async () => {
    const channelName = document.querySelector("[name='channelName']").value;
    const channelDescription = document.querySelector(
      "[name='channelDescription']"
    ).value;

    try {
      setLoading(true);

      const inputState = await validateInputs(channelName);

      if (inputState) {
        setLoading(false);
        setInputValidation(true);
      } else {
        setInputValidation(false);
        props.onHide();
        await setDoc(doc(db, "channels", channelName), {
          channelName: channelName,
          channelDescription: channelDescription,
          members: [uid],
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInputs = async (channelName) => {
    let isInvalid = false;
    try {
      const inputValidation = await channelName.length;
      console.log(inputValidation);

      if (inputValidation === 0) {
        isInvalid = true;
      } else {
        const q = query(collection(db, "channels"));
        const querySnapshot = await getDocs(q);

        // Test if that name is repeted
        querySnapshot.forEach((doc) => {
          if (
            doc.data().channelName.toLowerCase() === channelName.toLowerCase()
          ) {
            isInvalid = true;
          }
        });
      }

      return isInvalid;
    } catch (error) {}
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="modalCreateChannel"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <InputGroup className="mb-3 " hasValidation>
            <Form.Control
              className="customSideBarInput"
              placeholder="Channel Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="channelName"
              required
              isInvalid={inputValidation}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a valid and non repeated channel name
            </Form.Control.Feedback>
          </InputGroup>

          <InputGroup>
            <Form.Control
              className="customSideBarInput"
              as="textarea"
              aria-label="With textarea"
              placeholder="Channel Description"
              name="channelDescription"
            />
          </InputGroup>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => newChannel()}>
          <Spinner
            hidden={!isLoading}
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          {isLoading ? "Loading…" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateChannel;
