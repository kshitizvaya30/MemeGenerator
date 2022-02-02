import React, { useState, useEffect } from "react";
import "./components/Styles/LoginForm.css";
import FormSignup from "./FormSignup";
import FormSuccess from "./components/CreateMemes/FormSuccess";
import { firebase } from "./fire";
import BoredApe from "./components/images/Bored Ape NFT.png";

const Form = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = async () => {
    clearErrors();
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            setPasswordError("Wrong Format");
        }
      });
  };

  const handleSignup = async() => {
    clearErrors();
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            setPasswordError("Wrong Format");
        }
      });
      console.log(user);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user));
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {user ? (
        <FormSuccess handleLogout={handleLogout} user={user} />
      ) : (
        <div className="form-container">
          <div className="form-content-left">
            <img className="form-img" src={BoredApe} alt="boredApe" />
          </div>
          <FormSignup
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        </div>
      )}
    </>
  );
};

export default Form;
