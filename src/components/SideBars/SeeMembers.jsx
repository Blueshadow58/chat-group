import React, { useContext, useEffect } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { ChannelContext } from "../../context/ChannelContext";
import { db } from "../../lib/init-firebase";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { useState } from "react";
import AddMember from "./AddMember";

const SeeMembers = () => {
  const { channel } = useContext(ChannelContext);
  const [members, setMembers] = useState(false);

  useEffect(() => {
    const qChannels = query(
      collection(db, "channels"),
      where("channelName", "==", channel.channelName)
    );
    onSnapshot(qChannels, (querySnapshot) => {
      const chUsers = [];
      querySnapshot.forEach((doc) => {
        chUsers.push(...doc.data().members);
      });
      filterUsers(chUsers);
    });
  }, [channel.channelName]);

  const filterUsers = (chUsers) => {
    const qUsers = query(collection(db, "users"), where("uid", "in", chUsers));
    onSnapshot(qUsers, (querySnapshot) => {
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push(doc.data());
      });
      setMembers(allUsers);
    });
  };

  return (
    <Container className="px-4">
      <Stack className="pb-3" gap={3}>
        <div>
          <span className="h5">{channel.channelName}</span>
        </div>
        <div className="pb-3">{channel.channelDescription}</div>
        <div className="">
          <Stack direction="horizontal" gap={3}>
            <div>
              <span className="h5">Members</span>
            </div>
            <div className="ms-auto">
              <AddMember channel={channel} />
            </div>
          </Stack>
        </div>
      </Stack>

      <Stack gap={3}>
        {members ? (
          members.map((member) => {
            return (
              <Stack key={member.uid} direction="horizontal" gap={4}>
                <div>
                  <img
                    src={member.photoURL}
                    alt="avatar"
                    style={{ width: "50px", height: "100%" }}
                    className="rounded"
                  />
                </div>
                <div>
                  <span className="user-name">{member.displayName}</span>
                </div>
              </Stack>
            );
          })
        ) : (
          <Spinner
            className="align-self-center mt-4"
            animation="border"
            role="status"
          >
            <span className=" visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Stack>
    </Container>
  );
};

export default SeeMembers;
