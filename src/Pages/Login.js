import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from "../firebase.js";
import Input from "../components/Input.js";
import Button from "../components/Button";
import '../components/styles.css';
import Logo from '../components/Logo'

const option = {
  fadeAway: true,
  fadeAwayTimeout: 500,
};

const Login = () => {
  const [emailState, setEmail] = useState("");
  const [passWordState, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    firebase.auth()
      .signInWithEmailAndPassword(emailState, passWordState)
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          growl.error({ text: "Senha Incorreta", ...option });
        } else if (errorCode === "auth/user-not-found") {
          growl.error({ text: "Email não registrado!", ...option });
        } else if (errorCode === "auth/invalid-email") {
          growl.error({ text: "Formato de email inválido", ...option });
        }
      });
  };

  return (
    <>
      <section class='container main-container'>
        <section class="container">
          <Logo />
        </section>
        <section class="container">
          <form class="container">
            <Input title="Email"  value={emailState} type="e-mail" placeholder="exemplo@exemplo.com" onChange={(e) => setEmail(e.currentTarget.value)} />
            <Input title="Senha"  value={passWordState} type="password" placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
            <div className="">
              <Button
                class="btn-enviar burger-queen"
                children="Login"
                onClick={(e) => {
                  login(); e.preventDefault();
                }}
              />
              <Button
                class="btn-enviar burger-queen"
                children="Registrar"
                onClick={(e) => {
                  history.push("/register"); e.preventDefault();
                }}
              />
            </div>
          </form>
        </section>
      </section>
    </>

  );
};
export default Login;