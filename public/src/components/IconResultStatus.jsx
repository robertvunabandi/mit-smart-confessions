import React from "react";
import LikeIcon from "../assets/like.jpg";
import LoveIcon from "../assets/love.jpg";
import HahaIcon from "../assets/haha.jpg";
import WowIcon from "../assets/wow.jpg";
import SadIcon from "../assets/sad.jpg";
import AngryIcon from "../assets/angry.jpg";
import {CLASSES} from "../variables/identifiers.jsx";

const {FB_REACTIONS} = require("../../../lib/constants.js");

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

  render() {
    return <IconResultStatusView icon_name={this.props.icon_name} count={this.props.count}  />;
  }
}

function IconResultStatusView(props) {
  let img_src = IconResultStatusContainer.getIcon(props.icon_name);

  return (
    <span className={CLASSES.reactionIcon}>
      <span className={CLASSES.reactionIconSpan}>
        <img className={CLASSES.reactionIconImage} src={img_src}/>
      </span>
      <span className={CLASSES.reactionCountSpan}>{props.count}</span>
    </span>
  );
}