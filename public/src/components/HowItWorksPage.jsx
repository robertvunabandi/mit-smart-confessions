import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/how_it_works_page.css";

export default class HowItWorksPageContainer extends React.Component {
  render() {
    return <HowItWorksPageView />;
  }
}

function HowItWorksPageView() {
  return (
    <div id={IDS.howItWorksPage} className={CLASSES.pageWrapper}>
      This is upcoming.
    </div>
  );
}