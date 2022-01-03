import { useRouter } from "next/router";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { uiConfig } from "../js/firebase";

function Signin({ auth }) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
      },
      (error) => {
        setError(error);
      },
      (completed) => {
        setLoading(false);
      }
    );
  }, [auth]);
  const router = useRouter();
  const authConfig = uiConfig;
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error occurred!</div>
  ) : (
    <div id="firebaseui-auth-container">
      <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
    </div>
  );
}

export default Signin;
