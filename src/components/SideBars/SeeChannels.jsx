import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SideBar.css";
import { BsSearch } from "react-icons/bs";
import { initials } from "./functions";

const test = [
  { name: "test" },
  { name: "test2" },
  { name: "test test3" },
  { name: "test test4" },
  { name: "test" },
  { name: "test2" },
  { name: "test test3" },
  { name: "test test4" },
  { name: "test" },
  { name: "test2" },
  { name: "test test3" },
  { name: "test test4" },
];

const SeeChannels = () => {
  return (
    <Container className="px-4">
      <Stack className="pb-3" gap={3}>
        <div>
          <div className="d-grid gap-2">
            <Button className="d-grid" variant="dark">
              New Channel
            </Button>
          </div>
        </div>
        <div className="pb-2">
          <InputGroup className="pb-2">
            <InputGroup.Text id="basic-addon1" className="customSideBarInput">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon1"
              className="customSideBarInput"
            />
          </InputGroup>
        </div>
      </Stack>
      <Stack gap={3}>
        {test.map((data, index) => {
          return (
            <Stack key={index} direction={"horizontal"} className="" gap={3}>
              <div className="divInitialChannel text-center ">
                <span className="initialChannelName">
                  {initials(data.name)}
                </span>
              </div>
              <div className="ChannelName">{data.name}</div>
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
};

export default SeeChannels;
