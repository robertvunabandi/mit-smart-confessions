import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/about_page.css";

export default class AboutPageContainer extends React.Component {
  render() {
    return <AboutPageView />;
  }
}

function AboutPageView() {
  return (
    <div id={IDS.aboutPage} className={CLASSES.pageWrapper}>
      This is upcoming.
    </div>
  );
}