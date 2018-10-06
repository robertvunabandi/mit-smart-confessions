/**
 * checks whether the argument given is a string with length at
 * least 1
 * @param {String} string
 * @return {Boolean}
 **/
function isStringNonEmpty(string) {
  return !!string && (typeof string === "string") && (string.toString().length > 0);
}

/**
 * checks whether the argument given is not a string or a string with
 * length 0
 * @param {String} string
 * @return {Boolean}
 **/
function isStringEmpty(string) {
  return !isStringNonEmpty(string);
}

/**
 * returns a string copy of the argument with the first letter
 * uppercased.
 * @param {String} word
 * @return {String}
 * */
function uppercaseFirstLetterWord(word) {
  if (isStringNonEmpty(word)) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }
  return "";
}

/**
 * returns a string copy of the argument with all words's first letter
 * uppercased. this assumes there are no punctuation
 * @param {String} string
 * @return {String}
 * */
function uppercaseFirstLettersSimpleString(string) {
  return string.split(/(\s)/).reduce((out, word) => {
    return out + uppercaseFirstLetterWord(word);
  }, "");
}

/**
 * returns whether an object is null, this treats all numbers as not
 * null; on the other hand a string of length 0 is null.
 * @param {*} element
 * @return {Boolean}
 * */
function isNull(element) {
  if (typeof element === "number") {
    return false;
  }
  return !element;
}

/**
 * returns an object whose keys are specified in the array and whose
 * key values are all the same as specified by value
 * @param {String[], Number[]} array
 * @param {*} [value=null]
 * @return {Object}
 * */
function createObjectWithKeysAndValue(array, value) {
  const default_value = !isNull(value) ? value : null;
  return array.reduce((obj, key) => {
    obj[key] = default_value;
    return obj;
  }, {});
}

export {
  isStringEmpty,
  isNull,
  uppercaseFirstLettersSimpleString,
  createObjectWithKeysAndValue,
};