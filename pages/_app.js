import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import "../styles/global.css";
import React from "react";
import ScheduleModel from "../js/scheduleModel";
import { auth } from "../js/firebase";
import { onAuthStateChanged } from "firebase/auth";

const model = new ScheduleModel();

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.auth = auth;
  });

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user is a `User` object or `null`
      console.log("setting user");
      model.setUser(user ? user.email : null);
    });
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Cleaning schedule</title>
      </Head>
      <Script
        src="https://kit.fontawesome.com/067013981a.js"
        crossorigin="anonymous"
      />
      <Component {...pageProps} model={model} auth={auth} />
    </div>
  );
}
