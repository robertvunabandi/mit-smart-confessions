import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/privacy_page.css";

export default class PrivacyPageContainer extends React.Component {
  render() {
    return <PrivacyPageView />;
  }
}

function PrivacyPageView() {
  return (
    <div id={IDS.privacyPage} className={CLASSES.pageWrapper}>
      This is upcoming.
    </div>
  );
}