// Valid if string is between 1 and 511 characters (from API condition)
exports.inputIsValid = (toParse) => {
  if (toParse.length <= 0 || toParse.length >= 512) {
    return false;
  };
  
  return true;
};