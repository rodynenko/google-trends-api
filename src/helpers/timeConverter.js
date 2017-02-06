/**
*
*@function convertTimePeriod
*@param {object} timePeriod
*@return {string} converted timeperiod for url
*/
function convertTimePeriod(timePeriod){
  let timePeriodMap = {
    year: 'today',
    month: 'today',
    day: 'now'
  }
  let detailizationMap = {
    month: 'm',
    day: 'd'
  }

  // default detaization params
  if (!timePeriod.detalization) { timePeriod.detalization = 'day'; }
  if (!timePeriod.value) { timePeriod.value = 7; }

  return `date=${timePeriodMap[timePeriod.type]} ${timePeriod.value}-${detailizationMap[timePeriod.detalization]}`;
}

export default convertTimePeriod;
