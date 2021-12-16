import Head from "next/head";
import Script from "next/script";
import "../styles/global.css";
import React from "react";
import ScheduleModel from "../js/scheduleModel";

const model = new ScheduleModel();

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
  });
  return (
    <div className="app">
      <Head>
        <title>Cleaning schedule</title>
      </Head>
      <Script
        src="https://kit.fontawesome.com/067013981a.js"
        crossorigin="anonymous"
      />
      <Component {...pageProps} model={model} />
    </div>
  );
}
