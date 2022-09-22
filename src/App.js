import "./App.css";
import Button from "./components/Button";
import { GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "./lib/init-firebase";
import Channel from "./components/Channel";
import { Container, Row, Col } from "react-bootstrap";
import ChannelProvider from "./context/ChannelContext";

import SideBar from "./components/SideBar";

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    //clean suscription
    return unsuscribe;
  }, [initializing]);

  const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "loading...";

  return (
    <ChannelProvider>
      <section>
        <Container fluid style={{ height: "100vh" }}>
          <Row>
            {user ? (
              <>
                {/* SIDEBARD */}
                <Col
                  className="d-none d-md-block g-0"
                  xs={0}
                  md={3}
                  style={{
                    backgroundColor: "#120f13",
                    color: "white",
                    position: "relative",
                  }}
                >
                  <SideBar user={user} signOut={signOut} />
                </Col>
                {/* CHANNEL */}
                <Col
                  className="g-0"
                  xs={12}
                  md={9}
                  style={{
                    backgroundColor: "#252329",
                  }}
                >
                  <Channel user={user} db={db} signOut={signOut} />
                </Col>
              </>
            ) : (
              <Button onClick={signWithGoogle}>signWithGoogle</Button>
            )}
          </Row>
        </Container>
      </section>
    </ChannelProvider>
  );
}

export default App;
