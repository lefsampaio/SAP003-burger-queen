import './components/styles.css';
import firebase from "./firebase";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Saloon from './Pages/Saloon';
import Kitchen from './Pages/Kitchen'
import React, { useEffect } from 'react'
import {
  Route,
  useHistory
} from 'react-router-dom'

export default function App() {

  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection("users").doc(user.uid)
          .get().then((snap) => {
            const profileData = snap.data();
            if (profileData.service === "saloon") {
              history.push("/saloon");
            } else {
              history.push("/kitchen");
            }
          });
      } else {
        history.push("/");
      }
    });
  }, [history]);

  return (
    <>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/saloon" component={Saloon} />
      <Route path="/Kitchen" component={Kitchen} />
    </>
  );
}