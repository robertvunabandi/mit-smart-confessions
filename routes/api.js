const express = require("express");
const router = express.Router({});
const {HTTP_CODES, FB_REACTIONS} = require("../lib/constants.js");
const {randInt, tossCoinIsHead} = require("../lib/utils.js");

function getReactionCount() {
  let count = randInt(0, 3);
  let iterations = 0;
  while (tossCoinIsHead(0.5)) {
    count += randInt(1, 10);
    iterations += 1;
    if (iterations > 30) {
      break;
    }
  }
  return count;
}

router.get("/predict", function (req, res) {
  const {text} = req.query;
  if (text) {
    // todo - make a request to other api to make prediction
    const response = Object.keys(FB_REACTIONS).reduce((obj, reaction) => {
      // temp - return random generated reactions with at least 1
      obj[reaction] = getReactionCount();
      return obj;
    }, {});
    res.status(HTTP_CODES.SUCCESS.OK);
    res.send(response);
  } else {
    res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST);
    res.send({});
  }
});

module.exports = router;