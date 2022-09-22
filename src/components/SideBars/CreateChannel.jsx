import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/init-firebase";
import Spinner from "react-bootstrap/Spinner";

const CreateChannel = (props) => {
  const [isLoading, setLoading] = useState(false);

  const newChannel = async () => {
    const channelName = document.querySelector("[name='channelName']").value;
    const channelDescription = document.querySelector(
      "[name='channelDescription']"
    ).value;

    try {
      setLoading(true);
      await setDoc(doc(db, "channels", channelName), {
        channelName: channelName,
        channelDescription: channelDescription,
      });
      props.onHide();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
          <InputGroup className="mb-3 ">
            <Form.Control
              className="customSideBarInput"
              placeholder="Channel Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="channelName"
            />
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
