import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import "../styles/generate_page.css";
import GeneratorToolContainer from "./GeneratorTool.jsx";

export default class GeneratePageContainer extends React.Component {
  render() {
    return <GeneratePageView />;
  }
}

function GeneratePageView() {
  return (
    <div id={IDS.generatePage} className={CLASSES.pageWrapper}>
      <h1>MSC Text Generator</h1>
      <div className={CLASSES.predictIntroTextWrapper}>
        Generating a (likely) popular confession with some seed text
      </div>
      <GeneratorToolContainer />
      <div className={CLASSES.predictTextWrapper}>
        The text generated in generated in such a way that it tries to create a popular confession
        (something that will yield many reactions on the MIT Confessions facebook page).
      </div>
    </div>
  );
}