import React from "react";
import PropTypes from "prop-types";
import { createObjectWithKeysAndValue } from "../utilities/utils.jsx";
import { CLASSES } from "../variables/identifiers.jsx";
import IconResultStatusContainer from "./IconResultStatus.jsx";
import "../styles/predictor_reactions.css";

const {FB_REACTIONS, FB_REACTIONS_ORDER} = require("../../../lib/constants.js");
const defaultProps = {
  results: createObjectWithKeysAndValue(Object.keys(FB_REACTIONS), [[0, 0, 0]]),
};
const propTypes = {
  results: PropTypes.shape(createObjectWithKeysAndValue(
    Object.keys(FB_REACTIONS),
    PropTypes.array
  )).isRequired,
};

export default class PredictorReactionsContainer extends React.Component {

  render() {
    return <PredictorReactionsView {...this.props} />;
  }
}

PredictorReactionsContainer.defaultProps = defaultProps;
PredictorReactionsContainer.propTypes = propTypes;

function PredictorReactionsView(props) {
  return (
    <div className={CLASSES.reactionsWrapper}>
      {Object.keys(FB_REACTIONS)
      // sort the reactions in the order in which they
      // will appear on facebook
        .sort((a, b) => FB_REACTIONS_ORDER[a] - FB_REACTIONS_ORDER[b])
        .map((icon_name, key) => {
          return (
            <IconResultStatusContainer
              icon_name={icon_name}
              result={props.results[icon_name]}
              key={`${CLASSES.reactionIcon}-${key}`} />
          );
        })}
    </div>
  );
}