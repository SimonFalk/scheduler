import Head from "next/head";
import Script from "next/script";
import "../styles/global.css";
import React from "react";
import ScheduleModel from "../js/scheduleModel";
import { auth, database } from "../js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { set, ref, onValue } from "firebase/database";

const model = new ScheduleModel();

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.auth = auth;
  }, []);

  React.useEffect(() => {
    let loadingFromFirebase = false;
    let writingToFirebase = false;
    const writeObs = function () {
      // save the model into the cloud
      if (loadingFromFirebase) return; // flag that tells observer to NOT save to cloud
      writingToFirebase = true;
      set(ref(database, "tasks"), model.tasks);
      set(ref(database, "stars"), model.stars);
      writingToFirebase = false;
    };

    onAuthStateChanged(auth, (user) => {
      // user is a `User` object or `null`
      model.setUser(user ? user.email : null);
      //model.setUser(user ? user.email : "");
      if (user) {
        model.addObserver(writeObs);
        onValue(
          ref(database),
          (snapshot) => {
            // load data from cloud into model if there is data
            if (writingToFirebase) return;
            loadingFromFirebase = true; // set the flag so we don't upload the model while downloading it.
            try {
              const data = snapshot.val();
              if (data) {
                model.setTasks(data.tasks || []);
                model.setStars(data.stars || {});
                //model.sendMail();
              }
            } catch (e) {
              console.log(e);
            } finally {
              loadingFromFirebase = false; // unset the flag so the app can function as normal.
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        model.removeObserver(writeObs);
        model.setStars({});
        model.setTasks([]);
      }
    });
    return () => {
      model.removeObserver(writeObs);
    };
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
