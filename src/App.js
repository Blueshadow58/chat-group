import "./App.css";
import Button from "./components/Button";

import { GoogleAuthProvider } from "firebase/auth";
// import { onAuthStateChanged, signInWithPopup }

import { useState, useEffect } from "react";
import { auth, db } from "./lib/init-firebase";
import Channel from "./components/Channel";

// const firebaseConfig = {
//   apiKey: "AIzaSyCfSoXRrjnQSByBVeTtWqJHidIGV8V1pVo",
//   authDomain: "chat-group-fd154.firebaseapp.com",
//   projectId: "chat-group-fd154",
//   storageBucket: "chat-group-fd154.appspot.com",
//   messagingSenderId: "909247873713",
//   appId: "1:909247873713:web:ad101278ef02713a359890",
// };

// const app = initializeApp(firebaseConfig);

// const auth = app.auth();

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
  });

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
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>signOut</Button>
          <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signWithGoogle}>signWithGoogle</Button>
      )}
    </div>
  );
}

export default App;
