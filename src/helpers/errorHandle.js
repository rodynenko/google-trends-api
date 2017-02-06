/**
* handle errors of options' object
*/
function checkErrors(options) {
  if (!options) return new Error('Options was not set to TrendData function');
  return null;
}

export default checkErrors;
