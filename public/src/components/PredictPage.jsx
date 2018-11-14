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
      <div className={CLASSES.predictIntroTextWrapper}>
        Find out how popular your confession will be
      </div>
      <PredictorToolContainer />
      <div className={CLASSES.predictTextWrapper}>
        The predictions made are of the form "min-max: probability"
      </div>
      <br/>
      <div className={CLASSES.predictTextWrapper}>
        That is to say, our model thinks that the confession you have given has that probability
        of being in that range (from min to max). The 3 range predictions you see are the top 3
        ranges that our model has predicted for your confession.
      </div>
      <br/>
      <div className={CLASSES.predictTextWrapper}>
        Try predicting something you've seen on the MIT confessions page to see how this performs!
      </div>
    </div>
  );
}