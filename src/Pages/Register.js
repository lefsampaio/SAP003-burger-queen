import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from 'firebase';
import Input from "../components/Input.js";
import Button from "../components/Button";
import Select from "../components/Select.js";
import Logo from "../components/Logo.js";

const effect = {
  fadeAway: true,
  fadeAwayTimeout: 1000,
};

const Register = () => {
  const [nameState, setName] = useState("");
  const [serviceState, setService] = useState("Saloon");
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");

  const history = useHistory();

  const register = () => {

    if (nameState.length > 0) {
      firebase.auth()
        .createUserWithEmailAndPassword(emailState, passwordState)
        .then(() => {
          firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name: nameState,
              service: serviceState,
              email: emailState,
              password: passwordState,
              userId: firebase.auth().currentUser.uid,
              addedAt: (new Date()).toLocaleString("pt-BR"),
            });
        }).then(() => {
          if (serviceState === "saloon") {
            history.push("/saloon");
            growl.success({ text: "Bem vindo!", ...effect });
          } else {
            history.push("/kitchen");
            growl.success({ text: "Bem vindo!", ...effect });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            growl.error({ text: "E-mail já possui uma conta cadastrada!", ...effect });
          } else if (errorCode === "auth/invalid-email") {
            growl.error({ text: "Formato de email inválido!", ...effect });
          } else if (errorCode === "auth/weak-password") {
            growl.error({ text: "Senha deve possuir no mínimo 6 caracteres!", ...effect });
          }
        });
    } else {
      growl.warning({
        text: "Preencha seu nome",
        ...effect,
      });
    }
  };
  return (
    <>
      <section className='container'>
        <Logo />
        <section className="container-login">
          <section className="container">
            <form className="form-container">
              <Input value={nameState} title="Nome" type="text" placeholder="Nome" onChange={(e) => setName(e.currentTarget.value)} />
              <Select className="select" title="Selecione" onChange={(e) => setService(e.currentTarget.value)} />
              <Input value={emailState} title="Email" type="e-mail" placeholder="exemplo@exemplo.com" onChange={(e) => setEmail(e.currentTarget.value)} />
              <Input value={passwordState} title="Senha" type="password" placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
              <div className="btn-container">
                <Button
                  class="btn-enviar burger-queen"
                  children="Voltar"
                  onClick={() => {
                    history.push("/");
                  }}
                />
                <Button
                  class="btn-enviar burger-queen"
                  children="Registrar"
                  onClick={(e) => { register(); e.preventDefault(); }}
                />
              </div>
            </form>
          </section>
        </section>
      </section>
    </>

  );
};

export default Register;