import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { List } from "react-bootstrap-icons";
import SideBar from "./SideBar";

function NavBar({ user = null, signOut = null }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand={show} className=" mb-3 custom-chat-navbar ">
        <Container fluid>
          <Navbar.Toggle
            onClick={() => handleShow()}
            className="d-md-none text-white"
            // aria-controls={`offcanvasNavbar-expand-${expand}`}
          >
            <List />
          </Navbar.Toggle>

          <Navbar.Brand className="ms-auto chat-channel-title pt-2">
            Chat-Group-Proyect
          </Navbar.Brand>

          <Navbar.Offcanvas
            placement="start"
            className="custom-off-canvas"
            show={show}
            onHide={handleClose}
          >
            {/* <Offcanvas.Header closeButton>
              <Offcanvas.Title>Channels</Offcanvas.Title>
            </Offcanvas.Header> */}
            <SideBar user={user} signOut={signOut} handleClose={handleClose} />
            {/* <Offcanvas.Body> */}
            {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav> */}
            {/* </Offcanvas.Body> */}
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
