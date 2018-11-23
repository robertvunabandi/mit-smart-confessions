import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/how_it_works_page.scss";

export default class HowItWorksPageContainer extends React.Component {
  render() {
    return <HowItWorksPageView />;
  }
}

function HowItWorksPageView() {
  return (
    <div id={IDS.howItWorksPage} className={CLASSES.pageWrapper}>
      <h1>Work in Progress...</h1>
    </div>
  );
}