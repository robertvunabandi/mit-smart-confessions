import React from "react";
import PropTypes from "prop-types";

import LikeIcon from "../assets/like.jpg";
import LoveIcon from "../assets/love.jpg";
import HahaIcon from "../assets/haha.jpg";
import WowIcon from "../assets/wow.jpg";
import SadIcon from "../assets/sad.jpg";
import AngryIcon from "../assets/angry.jpg";
import {CLASSES} from "../variables/identifiers.jsx";
const {FB_REACTIONS} = require("../../../lib/constants.js");
import { roundToNearestDigits, addInBetweenArrayElements } from "../utilities/utils.jsx";


const propTypes = {
  icon_name: PropTypes.string.isRequired,
  result: PropTypes.array.isRequired,
};

export default class IconResultStatusContainer extends React.Component {
  constructor(props) {
    super(props);
    // todo - do some cool animation where the count increases live
  }

  static getIcon(icon_name) {
    // ew switch statements, gross
    switch (icon_name) {
      case FB_REACTIONS.like:
        return LikeIcon;
      case FB_REACTIONS.love:
        return LoveIcon;
      case FB_REACTIONS.haha:
        return HahaIcon;
      case FB_REACTIONS.wow:
        return WowIcon;
      case FB_REACTIONS.sad:
        return SadIcon;
      case FB_REACTIONS.angry:
        return AngryIcon;
      default:
        throw "Invalid Icon Received";
    }
  }

  /**
   * tune the results to display the highest top_k range predictions
   * @param {Array<Array<Number, Number, Number>>} results
   * @param {Number} top_k
   * @return {Array<Array<Number, Number, Number>>}
   * */
  static tuneResults(results, top_k) {
    // .concat() makes a copy of the list, r2[2] - r1[2] sorts from
    // highest to lowest probability
    let sorted_results = results.concat().sort((r1, r2) => r2[2] - r1[2]);
    return sorted_results.slice(0, top_k).map(obj => {
      const [min_v, max_v, prob] = obj;
      return [Math.max(min_v, 0), max_v, prob];
    });
  }

  /**
   * checks whether the results provided by the parent elements
   * are predictions coming from the server.
   * @param {Array<Array<Number, Number, Number>>} results
   * @return {Boolean}
   * */
  static isPrediction(results) {
    if (results.length === 0) {
      return false;
    }
    if (results.length === 1) {
      const [min_value, max_value] = results[0];
      return min_value !== 0 && max_value !== 0;
    }
    // by default, we only have 1 result, so this has to be a
    // prediction if we have anything different than the default
    return true;
  }

  render() {
    return <IconResultStatusView {...this.props}  />;
  }
}

IconResultStatusContainer.propTypes = propTypes;

function IconResultStatusView(props) {
  const img_src = IconResultStatusContainer.getIcon(props.icon_name);
  const TOP_K = 3;
  const tuned_result = IconResultStatusContainer.tuneResults(props.result, TOP_K);
  const result_react = tuned_result.map(result_obj => {
    const [min_range, max_range, prob] = result_obj;
    return (
      <span className={CLASSES.reactionResultPrediction}>
        {min_range}-{max_range}: {roundToNearestDigits(prob, 3)}
      </span>
    );
  });
  const is_prediction = IconResultStatusContainer.isPrediction(props.result);

  return (
    <span className={CLASSES.reactionIcon}>
      <span className={CLASSES.reactionIconSpan}>
        <img className={CLASSES.reactionIconImage} src={img_src}/>
      </span>
      <span className={CLASSES.reactionResultSpan}>
        {is_prediction ? result_react : null}
      </span>
    </span>
  );
}