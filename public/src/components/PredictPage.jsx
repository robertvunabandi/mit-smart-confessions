import React from "react";
import PredictorToolContainer from "./PredictorTool.jsx";
import NoticeBoxContainer from "./NoticeBox.jsx";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/predict_page.css";

export default class PredictPageContainer extends React.Component {
  render() {
    return <PredictPageView />;
  }
}


function PredictPageView() {
  return (
    <div id={IDS.predictPage} className={CLASSES.pageWrapper}>
      <h1>MSC Prediction</h1>
      <PredictorToolContainer />
      <div style={{width: "60%", margin: "0 auto"}}>
        <NoticeBoxContainer
          type={NoticeBoxContainer.NOTICE_TYPES.WARNING}
          message={
            "At this moment, the predictions made are completely random. " +
            "This is just a demo of what this prediction tool will look like " +
            "once it is completed. "
          } />
      </div>
    </div>
  );
}