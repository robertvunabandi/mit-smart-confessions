import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/understand_page.scss";

export default class UnderstandPageContainer extends React.Component {
  render() {
    return <UnderstandPageView />;
  }
}

function UnderstandPageView() {
  return (
    <div id={IDS.understandPage} className={CLASSES.pageWrapper}>
      <h1>Work in Progress...</h1>
    </div>
  );
}