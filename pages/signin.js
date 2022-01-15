import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { uiConfig } from "../js/firebaseAuthConfig";

function Signin({ auth }) {
  return (
    <div id="firebaseui-auth-container">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default Signin;
