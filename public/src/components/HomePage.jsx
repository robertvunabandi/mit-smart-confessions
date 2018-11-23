import React from "react";
import LineBreakContainer from "./LineBreak.jsx";
import "../styles/home_page.scss";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import LOGO_SRC from "../assets/msc-logo-large.png";
import HorizontalSplitDivContainer from "./HorizontalSplitDiv.jsx";

export default class HomePageContainer extends React.Component {
  render() {
    return <HomePageView />;
  }
}

function HomePageView() {
  return (
    <div id={IDS.homePage} className={CLASSES.pageWrapper} >
      <h1>Welcome to MIT Smart Confession</h1>
      We use machine learning to take confessions to the next level.
      <br/>
      <br/>
      <LineBreakContainer />
      <HorizontalSplitDivContainer>
        <div className={CLASSES.homePageBlock}>
          <h3>Confession Rater</h3>
          Predict how popular your confession will be.
          <br />
          <br />
          <a href={"/predict"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Smart Confession Completion</h3>
          Start writing, let our tool complete the confession to maximize popularity.
          <br />
          <br />
          <a href={"/generate"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Understanding Confessions</h3>
          Understand what makes some confessions more popular than others.
          <br />
          <br />
          <a href={"/understand"}>
            View Explanations
          </a>
        </div>
      </HorizontalSplitDivContainer>
      <LineBreakContainer />
      <br />
      If interested, you can find out <a href={"/how-it-works"}>how this works</a> behind
      the scene.
      <br />
      <div id={IDS.homePageLogo}><img src={LOGO_SRC}/></div>
    </div>
  );
}