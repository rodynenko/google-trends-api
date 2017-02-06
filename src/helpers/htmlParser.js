/**
* Parse google trends data to correct format of Array
*@function parseGoogleTrendsResponce
*@param {string} response - responseText from Google
*@return {array} - array of objects { date: Date, value: number }
*/
function parseResponse(response){
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

export default parseResponse;
