/**
 * returns a random integer between a and b if (a < b) else
 * between b and a.
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 **/
function randInt(a, b) {
  let [min, max] = [Math.min(a,b), Math.max(a,b)];
  return Math.round((Math.random() * (max - min)) + min);
}

/**
 * tosses a coin with the given probability, and returns true if
 * it's a head. false otherwise.
 * @param {Number} [p=0.5]
 * @return {Boolean}
 **/
function tossCoinIsHead(p) {
  if (typeof p !== "number") {
    p =  0.5;
  }
  return Math.random() < (p < 0 ? 0 : (p > 1 ? 1 : p));
}

module.exports = {randInt, tossCoinIsHead};