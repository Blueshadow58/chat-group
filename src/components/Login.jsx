import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import "../figures/figures.css";

const Login = ({ signWithGoogle }) => {
  return (
    <Container
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div id="figure1"></div>
      <div id="figure2"></div>

      <Card style={{ backgroundColor: "#120F13" }}>
        <Card.Body>
          <Card.Title className="text-center pb-3">
            <BsGoogle size={50} color={"white"} />
          </Card.Title>
          <Button
            variant="outline-light"
            className="  "
            onClick={signWithGoogle}
          >
            Ingresar con google
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
