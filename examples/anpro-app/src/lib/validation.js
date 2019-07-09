module.exports.areValidChars = function (input) {
  return /^[a-z]+\b/.test(input)
}