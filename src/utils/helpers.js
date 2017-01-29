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
* Parse google trends data to correct format of Array
*@function parseGoogleTrendsResponce
*@param {string} response - responseText from Google
*@return {array} - array of objects { date: Date, value: number }
*/
function parseGoogleTrendsResponce(response){
  // handle error
  let errorReg = new RegExp(/internal_error/);

  if (response.match(errorReg)) {
    console.log("Error in request to Google Trends - check parameter of timePeriod");
    return [ ];
  }

  let answer = [];

  let rg = new RegExp(/\/\/ Data table response\ngoogle\.visualization\.Query\.setResponse\((.*)\);/);
  // change dates to suit JSON format
  let regDate = new RegExp(/new Date\(.{8,10}\)/g);

  let json_valid = JSON.parse(response.match(rg)[1].replace(regDate, (str)=>{
    // leave only number of the day: yyyy-mm-dd versus new Date(yyyy,mm,dd)
    let tempRegDate = new RegExp(/new Date\((.{8,10})\)/);
    return '"'+str.match(tempRegDate)[1]+'"';
  })).table.rows;

  for(let i=0; i<json_valid.length; i++){
    let tempObj = json_valid[i].c,
        dateParams = tempObj[0].v.split(',');
    answer.push({
      date: new Date(+dateParams[0],+dateParams[1],+dateParams[2]),
      value: tempObj[1].v
    });
  }

  return answer;
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
