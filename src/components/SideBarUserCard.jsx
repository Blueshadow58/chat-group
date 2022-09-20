import { Col, Row, Container, Stack, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { ChevronDown } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

function SideBarUserCard({ user, signOut }) {
  const { uid, displayName, photoURL } = user;

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
        <div className="ms-auto">{dropDown(signOut)}</div>
      </Stack>
    </Container>
  );
}
const dropDown = (signOut) => {
  return (
    <Dropdown>
      <DropdownButton
        drop={"up"}
        variant="dark"
        align="end"
        menuVariant="dark"
        title=""
      >
        <Dropdown.Item eventKey="1">
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
