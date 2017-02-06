/**
* function description
*/
import checkErrors from '../helpers/errorHandle';
import htmlParser from '../helpers/htmlParser';
import requestHandler from '../helpers/requestHandler';

function trendData(options, cb){
  if (typeof cb !== 'function') throw new Error('Callback was not set to TrendData function');

  const checkError = checkErrors(options);
  if (checkError instanceof Error) cb(checkError);

  const { keywords, timePeriod } = options

  requestHandler(keywords, timePeriod , (error, response) => {
    if (error) { cb(error); return; }
    cb(null, htmlParser(response));
  });
}

export default trendData;
