import React from "react";
import {isStringEmpty} from "../utilities/utils.jsx";
import API from "../utilities/api.jsx";
import {CLASSES} from "../variables/identifiers.jsx";
import PredictorReactionsContainer from "./PredictorReactions.jsx";

export default class PredictorToolContainer extends React.Component {
  static get defaultState() {
    const results = PredictorReactionsContainer.defaultProps.results;
    return {
      text: null,
      last_text: null,
      results,
    };
  }

  constructor(props) {
    super(props);
    this.state = PredictorToolContainer.defaultState;
  }

  predict() {
    // don't do anything if no string has been given
    if (isStringEmpty(this.state.text)) {
      console.warn("no text given");
      return;
    }
    // don't predict twice if we have already made this prediction
    // last_text update every time we call this function with a
    // different text on this.state.text
    if (this.state.text === this.state.last_text) {
      console.warn("already made prediction");
      return;
    }
    API.get(
      "/api/predict",
      {text: this.state.text},
      this.predictionSuccessCallback.bind(this),
      this.predictionFailureCallback.bind(this)
    );
  }

  predictionSuccessCallback(data) {
    this.updateLastText();
    this.setState(_ => {
      return {results: data};
    });
  }

  predictionFailureCallback(error) {
    // todo - implement this method
    console.error(error);
  }

  updateLastText() {
    this.setState((prevState, _) => {
      return {last_text: prevState.text};
    });
  }

  updateText(event) {
  this.setState({text: event.target.value});

  }

  render() {
    return (
      <PredictorToolView
        text={this.state.text}
        results={this.state.results}
        predict={this.predict.bind(this)}
        updateText={this.updateText.bind(this)}
      />
    );
  }
}

function PredictorToolView(props) {
  return (
    <div>
      <div className={CLASSES.predictIntroTextWrapper}>
        Find out how popular your confession will be
      </div>
      <div className={CLASSES.textAreaPredictWrapper}>
        {/*
        todo - check out https://github.com/buildo/react-autosize-textarea/tree/master/src
        yarn add react-autosize-textarea
        TextareaAutosize
        */}
        <textarea
          value={props.text || ""}
          onChange={props.updateText}
          onBlur={props.updateText}/>
      </div>
      <div className={CLASSES.buttonPredictWrapper}>
        <button onClick={props.predict}>Predict</button>
      </div>
      <PredictorReactionsContainer results={props.results}/>
    </div>
  );
}