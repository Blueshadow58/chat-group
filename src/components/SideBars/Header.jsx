import React from "react";
import { Button, Stack } from "react-bootstrap";
import { BsChevronLeft, BsXLg } from "react-icons/bs";

const SideBarHeader = ({ sideBar, changeSideBar, handleClose }) => {
  return (
    <Stack className="p-3" direction="horizontal" gap={3}>
      <div>
        <Button
          className="bg-transparent border-0 .d-block .d-sm-none"
          onClick={() => changeSideBar()}
        >
          <BsChevronLeft />
        </Button>
      </div>
      <div>
        {sideBar ? (
          <span className="h5">All channels</span>
        ) : (
          <span className="h5">Channels</span>
        )}
      </div>
      <div className="ms-auto">
        <Button
          className="bg-transparent border-0 .d-block .d-sm-none d-md-none "
          onClick={() => handleClose()}
        >
          <BsXLg />
        </Button>
      </div>
    </Stack>
  );
};

export default SideBarHeader;
