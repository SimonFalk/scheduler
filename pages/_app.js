import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import "../styles/global.css";
import React from "react";
import ScheduleModel from "../js/scheduleModel";
import { auth, database } from "../js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import persistModel from "../js/persistModel";

const model = new ScheduleModel();
model.build();
persistModel(model);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.auth = auth;
  }, []);

  React.useEffect(() => {
    console.log("Rendering app");
    onAuthStateChanged(auth, (user) => {
      // user is a `User` object or `null`
      console.log("User changed");
      model.setUser(user ? user.email : "");
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
