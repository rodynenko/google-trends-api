export function generateUrl(options) {
  let query =  null;

  let timePeriod = {
    type  : 'day',
    value : 30,
  };

  if (typeof options === 'object') {
    query = options.keywords.join(',');
    timePeriod = options.timePeriod;
  } else if (typeof options === 'string') {
    query = options;
  } else {
    console.log('error');
  }

  const url = `https://www.google.com/trends/fetchComponent?q=${query}&cid=TIMESERIES_GRAPH_0&export=3&hl=en-us&${convertTimePeriod(timePeriod)}`;
  return url;
};

export function getGoogleTrendsData(url, cb) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET',url);

  xhr.onreadystatechange = ()=>{
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) { cb(new Error("Error in downloading data")); return; }
    cb(null, parseGoogleTrendsResponce(xhr.responseText));
  };

  xhr.onerror = (e)=>{
    callbackFn(e);
  }

  xhr.send();
}



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

  return `date=${timePeriodMap[timePeriod.type]} ${timePeriod.value}-${detailizationMap[timePeriod.detalization]}`;
}
