import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/generate_page.css";

export default class GeneratePageContainer extends React.Component {
  render() {
    return <GeneratePageView />;
  }
}

function GeneratePageView() {
  return (
    <div id={IDS.generatePage} className={CLASSES.pageWrapper}>
      This is upcoming.
    </div>
  );
}