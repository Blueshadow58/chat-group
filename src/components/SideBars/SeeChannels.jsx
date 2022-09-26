import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SideBar.css";
import { BsSearch } from "react-icons/bs";
import { initials } from "./functions";
import CreateChannel from "./CreateChannel";
import { db } from "../../lib/init-firebase";
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from "firebase/firestore";
import { ChannelContext } from "../../context/ChannelContext";

const SeeChannels = ({ changeSideBar }) => {
  const [modalShow, setModalShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);
  const { changeChannel, user } = useContext(ChannelContext);

  const onHandleClick = (data) => {
    changeChannel(data);

    changeSideBar();
  };

  useEffect(() => {
    const data = channels.filter(({ channelName }) => {
      return channelName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredChannels(data);
  }, [channels, searchText]);

  const searchInput = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const q = query(
      collection(db, "channels"),
      where("members", "array-contains", user.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const channels = [];
      querySnapshot.forEach((doc) => {
        channels.push(doc.data());
      });

      setChannels(channels);
      setFilteredChannels(channels);
    });
  }, [user.displayName, user.photoURL, user.uid]);

  // console.log(channels);
  return (
    <Container className="px-4">
      <Stack className="pb-3" gap={3}>
        <div>
          <div className="d-grid gap-2">
            <Button
              className="d-grid"
              variant="dark"
              onClick={() => setModalShow(true)}
            >
              New Channel
            </Button>

            <CreateChannel
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
        <div className="pb-2">
          <InputGroup className="pb-2">
            <InputGroup.Text id="basic-addon1" className="customSideBarInput">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              defaultValue={""}
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon1"
              className="customSideBarInput"
              name="searchInput"
              onChange={(e) => searchInput(e)}
            />
          </InputGroup>
        </div>
      </Stack>
      <Stack gap={3}>
        {filteredChannels.map((data, index) => {
          return (
            <Stack
              key={index}
              direction={"horizontal"}
              className="hoverChannel"
              onClick={() => onHandleClick(data)}
              gap={3}
            >
              <div className="divInitialChannel text-center ">
                <span className="initialChannelName">
                  {initials(data.channelName)}
                </span>
              </div>
              <div className="ChannelName">{data.channelName}</div>

              <span className="channelIndicator ms-auto"></span>
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
};

export default SeeChannels;
