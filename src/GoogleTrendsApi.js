/**

options = {
  keywords : [ 'star wars', 'orange', 'coca cola'],
  timePeriod : {
    type : ,
    value :
  }
}
*/

import { generateUrl, getGoogleTrendsData } from './utils/helpers';

export class GoogleTrendsApi {
  /**
  *@function trendData
  *@param {object} options - see options details on the top
  *@param {function} cb - callback Fn(error, data)
  */
  trendData(options, cb) {
    getGoogleTrendsData(generateUrl(options), cb);
  }
}
