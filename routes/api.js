const express = require("express");
const router = express.Router({});
const { HTTP_CODES, FB_REACTIONS, DEFAULT_GENERATE_LENGTH } = require("../lib/constants.js");
const { randInt, tossCoinIsHead } = require("../lib/utils.js");
const API_URL = process.env.API_URL || "http://localhost:5000";
const http = require("http");

function makeHttpRequest(options) {
  return new Promise((resolve, reject) => {
    http.get(options, (response) => {
      let data_stream = "";
      response.on("data", (stream) => {
        data_stream += stream;
        console.log(data_stream, typeof data_stream);
      });
      response.on("end", () => {
        try {
          const json = JSON.parse(data_stream);
          resolve({ status: response.statusCode, json });
        } catch (exception) {
          console.warn("parsing json failed");
          resolve({ status: response.statusCode, json: data_stream });
        }
      });
    }).on("error", (error_obj) => {
      console.log("error from url...");
      reject({
        status: HTTP_CODES.SERVER_ERROR.BAD_GATEWAY,
        error: "error when making http request",
        error_obj,
      });
    });
  });
}

function isSuccessStatus(status) {
  return 200 <= status && status < 400;
}

function extractFbReactionsFromObj(json) {
  return Object.keys(FB_REACTIONS).reduce((obj, reaction) => {
    // temp - return random generated reactions ranges
    // do this if the key at the json object doesn't have it
    // todo - these are going to be ranged, make sure to handle that
    // i.e., arrays of format [[min, max, prob], ...]
    obj[reaction] = json[reaction] || getReactionCount();
    return obj;
  }, {});
}

function getReactionCount() {
  let last_min = -1;
  const bucket_count = randInt(3, 16);
  const buckets = [];
  let addition = 0, value = 0, total = 0;
  for (let i = 0; i < bucket_count; i += 1) {
    addition = randInt(3, 8);
    value = randInt(0, 100);
    buckets.push([last_min, last_min + addition, value]);
    last_min = last_min + addition;
    total += value;
  }
  for (let i = 0; i < bucket_count; i += 1) {
    buckets[i][2] = buckets[i][2] / total;
  }
  return buckets;
}

router.get("/predict", function (req, res) {
  const { text } = req.query;
  if (text) {
    const url = `${API_URL}/predict?text=${encodeURIComponent(text)}`;
    makeHttpRequest(url).then((success_obj) => {
      const { status, json } = success_obj;
      if (isSuccessStatus(status)) {
        const response = extractFbReactionsFromObj(json);
        res.status(HTTP_CODES.SUCCESS.OK);
        res.send(response);
      } else {
        // todo - should we send the json here?
        console.log("error haha");
        res.status(status);
        res.send(json);
      }
    }, (failure_obj) => {
      const { status, error, error_obj } = failure_obj;
      res.status(status);
      res.send({ error, error_obj });
    });
  } else {
    // temp - do this temporarily
    // const response = extractFbReactionsFromObj({});
    // res.status(HTTP_CODES.SUCCESS.OK);
    // res.send(response);
    res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST);
    res.send({ error: "There was no text input received", error_obj: {} });
  }
});

router.get("/generate", function (req, res) {
  const { seed_text, length } = req.query;
  if (seed_text) {
    const uri_seed_text = encodeURIComponent(seed_text);
    const url = `${API_URL}/generate?seed=${uri_seed_text}&length=${length || DEFAULT_GENERATE_LENGTH}`;
    makeHttpRequest(url).then(success_obj => {
      const { status, json } = success_obj;
      if (isSuccessStatus(status)) {
        // we are literally just sending the text over
        // as an array of one element
        const text_prediction = json;
        res.status(HTTP_CODES.SUCCESS.OK);
        res.send(text_prediction);
      } else {
        // todo - should we send the json here?
        res.status(status);
        res.send(json);
      }
    }, failure_obj => {
      const { status, error, error_obj } = failure_obj;
      res.status(status);
      res.send({ error, error_obj });
    });
  } else {
    // temp - send a dummy text for now
    // const text_prediction = "Here's a random text prediction for you!";
    // res.status(HTTP_CODES.SUCCESS.OK);
    // res.send(text_prediction);
    res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST);
    res.send({ "error": "No seed text was given in the parameters." });
  }
});

module.exports = router;