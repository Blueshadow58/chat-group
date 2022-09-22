import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChannelContext } from "../../context/ChannelContext";

const SeeMembers = () => {
  const { channel } = useContext(ChannelContext);

  return (
    <Container className="px-4">
      <Stack className="pb-3" gap={3}>
        <div>
          <span className="h5">{channel}</span>
        </div>
        <div></div>
        <div></div>
      </Stack>
    </Container>
  );
};

export default SeeMembers;
