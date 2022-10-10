import "./App.css";

import Button from "react-bootstrap/Button";

import { GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { auth, db } from "./lib/init-firebase";
import Channel from "./components/Channel";
import { Container, Row, Col } from "react-bootstrap";
import { ChannelContext } from "./context/ChannelContext";

import SideBar from "./components/SideBar";
import { setDoc, doc } from "firebase/firestore";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const { currentUser } = useContext(ChannelContext);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        currentUser(user);
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setDoc(doc(db, "users", userData.uid), userData);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    //clean suscription
    return unsuscribe;
  }, [currentUser, initializing]);

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
    <section style={{ height: "100vh" }}>
      {user ? (
        <Container fluid>
          <Row>
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
          </Row>
        </Container>
      ) : (
        <Login signWithGoogle={signWithGoogle} />
      )}
    </section>
  );
}

export default App;
