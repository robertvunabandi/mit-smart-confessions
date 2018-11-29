import React from "react";
import { isStringEmpty } from "../utilities/utils.jsx";
import API from "../utilities/api.jsx";
import { CLASSES, EVENTS } from "../variables/identifiers.jsx";
import PredictorReactionsContainer from "./PredictorReactions.jsx";
import NoticeSectionContainer from "./NoticeSection.jsx";
import { NOTICE_TYPES } from "./NoticeSection.jsx";
import LineBreakContainer from "./LineBreak";

export default class PredictorToolContainer extends React.Component {
  static get defaultState() {
    return {
      text: null,
      last_text: null,
      cache: {},
      is_predicting: false,
      results: PredictorReactionsContainer.defaultProps.results,
    };
  }

  constructor(props) {
    super(props);
    this.state = PredictorToolContainer.defaultState;
  }

  static dispatchPredictionEvent() {
    setTimeout(() => window.dispatchEvent(new CustomEvent(EVENTS.prediction)), 10);
  }

  predict() {
    // don't do anything if no string has been given
    if (isStringEmpty(this.state.text)) {
      NoticeSectionContainer.dispatchNotice(
        "Please provide a text to predict.",
        NOTICE_TYPES.WARNING
      );
      return;
    }

    // if the result is in the cache, just set that as the prediction
    if (this.state.text in this.state.cache) {
      const results = this.state.cache[this.state.text];
      this.setState(_ => {
        return { results };
      });
      PredictorToolContainer.dispatchPredictionEvent();
      return;
    }

    // make the API call
    this.setState({ is_predicting: true });
    API.get(
      "/api/predict",
      { text: this.state.text },
      this.predictionSuccessCallback.bind(this),
      this.predictionFailureCallback.bind(this)
    );
  }

  predictionSuccessCallback(data) {
    this.updateCache(data);
    this.setState(_ => {
      return { results: data, is_predicting: false };
    });
    PredictorToolContainer.dispatchPredictionEvent();
  }

  predictionFailureCallback(error) {
    NoticeSectionContainer.dispatchNotice(
      `An error occurred when making the prediction: ${error.text}.`,
      NOTICE_TYPES.ERROR
    );
    this.setState({ is_predicting: false });
  }

  updateCache(data) {
    this.setState((prevState, _) => {
      const new_cache = Object.keys(prevState.cache).reduce((new_cache_, key) => {
        new_cache_[key] = prevState.cache[key];
        return new_cache_;
      }, {});
      new_cache[prevState.text] = data;
      return { cache: new_cache };
    });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <PredictorToolView
        text={this.state.text}
        results={this.state.results}
        is_predicting={this.state.is_predicting}
        predict={this.predict.bind(this)}
        updateText={this.updateText.bind(this)}
      />
    );
  }
}

/*
todo - check out https://github.com/buildo/react-autosize-textarea/tree/master/src
yarn add react-autosize-textarea
TextareaAutosize
*/
function PredictorToolView(props) {
  return (
    <div>
      <div className={CLASSES.textAreaPredictWrapper}>
        <textarea
          value={props.text || ""}
          onChange={props.updateText}
          onBlur={props.updateText}/>
      </div>
      <div className={CLASSES.buttonPredictWrapper}>
        <button onClick={props.predict} disabled={props.is_predicting}>
          {props.is_predicting ? "Predicting..." : "Predict"}
        </button>
      </div>
      <LineBreakContainer/>
      <PredictorReactionsContainer results={props.results}/>
      <LineBreakContainer/>
    </div>
  );
}