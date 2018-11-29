import React from "react";
import PropTypes from "prop-types";
import {isStringEmpty} from "../utilities/utils.jsx";
import API from "../utilities/api.jsx";
import {CLASSES} from "../variables/identifiers.jsx";
import PredictorToolContainer from "./PredictorTool.jsx";
import NoticeSectionContainer, { NOTICE_TYPES } from "./NoticeSection.jsx";
import LineBreakContainer from "./LineBreak";

const DEFAULT_LENGTH = 20;

export default class GeneratorToolContainer extends React.Component {
  static get defaultState() {
    return {
      seed_text: null,
      length: null,
      cache: {}, // object mapping from text input to text prediction
      text_prediction: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = GeneratorToolContainer.defaultState;
  }

  predict() {
    // don't do anything if no string has been given
    if (isStringEmpty(this.state.seed_text)) {
      NoticeSectionContainer.dispatchNotice(
        "Please provide a text seed.",
        NOTICE_TYPES.WARNING)
      ;
      return;
    }

    // if the result is in the cache, just set that as the prediction
    if ((this.state.seed_text + this.state.length) in this.state.cache) {
      const text_prediction = this.state.cache[this.state.text];
      this.setState(_ => {
        return {text_prediction};
      });
      PredictorToolContainer.dispatchPredictionEvent();
      return;
    }

    // make the API call
    API.get(
      "/api/generate",
      {seed_text: this.state.seed_text, length: (this.state.length || DEFAULT_LENGTH) + ""},
      this.predictionSuccessCallback.bind(this),
      // both generator and predictor work the same here
      PredictorToolContainer.predictionFailureCallback.bind(this)
    );
  }

  predictionSuccessCallback(data) {
    this.updateCache(data);
    this.setState(_ => {
      return {text_prediction: data};
    });
    PredictorToolContainer.dispatchPredictionEvent();
  }

  updateCache(data) {
    this.setState((prevState, _) => {
      const new_cache = Object.keys(prevState.cache).reduce((new_cache_, key) => {
        new_cache_[key] = prevState.cache[key];
        return new_cache_;
      }, {});
      new_cache[prevState.text + prevState.length] = data;
      return {cache: new_cache};
    });
  }

  updateSeedText(event) {
    this.setState({seed_text: event.target.value});
  }

  updateLength(event) {
    this.setState({length: event.target.value});
  }

  render() {
    return (
      <GeneratorToolView
        seed_text={this.state.seed_text}
        length={this.state.length}
        text_prediction={this.state.text_prediction}
        predict={this.predict.bind(this)}
        updateSeedText={this.updateSeedText.bind(this)}
        updateLength={this.updateLength.bind(this)}
      />
    );
  }
}

function GeneratorToolView(props) {
  return (
    <div>
      <div className={CLASSES.textAreaPredictWrapper}>
        <textarea
          value={props.seed_text || ""}
          onChange={props.updateSeedText}
          onBlur={props.updateSeedText}/>
        <br/>
        <br/>
        <span className={CLASSES.generatorLength}>
          <span>
            <span className={CLASSES.generatorLengthLabel}>Desired Text Length</span>
            {"  "}
            <input
              className={CLASSES.generatorLengthInput}
              type={"number"}
              value={props.length || DEFAULT_LENGTH}
              maxLength={200}
              onChange={props.updateLength}
              onBlur={props.updateLength}/>
          </span>
        </span>
      </div>
      <div className={CLASSES.buttonPredictWrapper}>
        <button onClick={props.predict}>Predict</button>
      </div>
      <LineBreakContainer />
      <div className={CLASSES.generatorPrediction}>
        <span>{props.text_prediction}</span>
      </div>
      <LineBreakContainer />
    </div>
  );
}

GeneratorToolView.propTypes = {
  seed_text: PropTypes.string,
  length: PropTypes.number,
  text_prediction: PropTypes.string,
  predict: PropTypes.func.isRequired,
  updateSeedText: PropTypes.func.isRequired,
  updateLength: PropTypes.func.isRequired,
};