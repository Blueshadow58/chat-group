import React from "react";
import { formatRelative } from "date-fns";
import { Row, Col, Container, Card } from "react-bootstrap";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  return (
    <>
      <div className="d-flex flex-row justify-content-start mb-4">
        <img
          src={photoURL}
          alt="avatar 1"
          style={{ width: "50px", height: "100%" }}
          className="rounded"
        />

        <div
          // className="p-3 ms-3"
          className=" ms-3"
          style={{
            borderRadius: "15px",
            // backgroundColor: "rgba(57, 192, 237, 0.2)",
          }}
        >
          <div className="pb-1 d-flex justify-content-between">
            <span className="user-name align-top">{displayName}</span>

            {createdAt?.seconds ? (
              <span className="ps-2 createdAt align-top  ">
                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
              </span>
            ) : null}
          </div>

          <p className="small mb-0 message-text text-break">{text}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
