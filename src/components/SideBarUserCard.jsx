import { Container, Stack } from "react-bootstrap";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import Perfil from "./Perfil";
import { useState } from "react";

function SideBarUserCard({ user, signOut }) {
  const { displayName, photoURL } = user;
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container className="g-0 " fluid>
      <Stack
        className="custom-side-bar-user-card "
        direction="horizontal"
        gap={4}
      >
        <div className="">
          <img
            src={photoURL}
            alt="avatar 1"
            style={{ width: "55px", height: "100%" }}
            className="rounded"
          />
        </div>
        <div className="">
          <span className="user-name align-middle">{displayName}</span>
        </div>
        <div className="ms-auto">{dropDown(signOut, setModalShow)}</div>
      </Stack>
      <Perfil show={modalShow} onHide={() => setModalShow(false)} user={user} />
    </Container>
  );
}
const dropDown = (signOut, setModalShow) => {
  return (
    <Dropdown>
      <DropdownButton
        drop={"up"}
        variant="dark"
        align="end"
        menuVariant="dark"
        title=""
      >
        <Dropdown.Item eventKey="1" onClick={() => setModalShow(true)}>
          <FaRegUserCircle /> <span className="ps-1">Perfil</span>
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" onClick={signOut} className="logoutColor ">
          <FaSignOutAlt /> <span className="ps-1">Logout</span>
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default SideBarUserCard;
