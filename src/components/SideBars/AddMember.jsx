import React, { useContext } from "react";
import { db } from "../../lib/init-firebase";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
  Stack,
} from "react-bootstrap";
import {
  arrayUnion,
  collection,
  doc,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { ChannelContext } from "../../context/ChannelContext";

const AddMember = ({ channel }) => {
  const { user } = useContext(ChannelContext);
  const [listMembers, setListMembers] = useState([]);

  const getMembers = async (e) => {
    try {
      e.preventDefault();

      const nameUser = e.target.elements.nameUser.value;
      const ref = collection(db, "users");
      const q = query(
        ref,
        where("uid", "!=", user.uid),
        orderBy("uid"),
        limit(5),
        startAt(nameUser),
        endAt(nameUser + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const members = [];
      await querySnapshot.forEach((doc) => {
        members.push(doc.data());
      });
      setListMembers(members);
    } catch (error) {
      console.log(error);
    }
  };

  const addMemberBtn = async (member) => {
    const { channelName } = channel;
    const channelRef = doc(db, "channels", channelName);
    // const memberData = {
    //   displayName: member.displayName,
    //   uid: member.uid,
    //   photoURL: member.photoURL,
    // };

    // console.log(memberData);

    try {
      await updateDoc(channelRef, {
        members: arrayUnion(member),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const popover = (
    <Popover>
      <Popover.Header as="h3">Add Member</Popover.Header>
      <Popover.Body>
        <Form className="pb-3" onSubmit={(e) => getMembers(e)}>
          <InputGroup className="">
            <Form.Control
              placeholder="Name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="nameUser"
            />
            <Button variant="primary" id="button-addon2" type="submite">
              Search
            </Button>
          </InputGroup>
        </Form>

        {listMembers ? (
          listMembers.map((member) => {
            return (
              <Stack
                key={member.uid}
                direction="horizontal"
                gap={3}
                className="pb-2"
              >
                <div>
                  <img
                    src={member.photoURL}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                    className="rounded"
                  />
                </div>
                <div>
                  <span className="text-white h6">{member.displayName}</span>
                </div>
                <div className="ms-auto">
                  <Button onClick={() => addMemberBtn(member)}>Add</Button>
                </div>
              </Stack>
            );
          })
        ) : (
          <>no tan</>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button variant="primary">Add member</Button>
    </OverlayTrigger>
  );
};

export default AddMember;
