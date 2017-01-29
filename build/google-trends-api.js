var googleTrends =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GoogleTrendsApi = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     options = {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       keywords : [ 'star wars', 'orange', 'coca cola'],
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       timePeriod : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         type : ,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         value :
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

	var _helpers = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GoogleTrendsApi = exports.GoogleTrendsApi = function () {
	  function GoogleTrendsApi() {
	    _classCallCheck(this, GoogleTrendsApi);
	  }

	  _createClass(GoogleTrendsApi, [{
	    key: 'trendData',

	    /**
	    *@function trendData
	    *@param {object} options - see options details on the top
	    *@param {function} cb - callback Fn(error, data)
	    */
	    value: function trendData(options, cb) {
	      (0, _helpers.getGoogleTrendsData)((0, _helpers.generateUrl)(options), cb);
	    }
	  }]);

	  return GoogleTrendsApi;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.generateUrl = generateUrl;
	exports.getGoogleTrendsData = getGoogleTrendsData;
	function generateUrl(options) {
	  var query = null;

	  var timePeriod = {
	    type: 'day',
	    value: 30
	  };

	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    query = options.keywords.join(',');
	    timePeriod = options.timePeriod;
	  } else if (typeof options === 'string') {
	    query = options;
	  } else {
	    console.log('error');
	  }

	  var url = 'https://www.google.com/trends/fetchComponent?q=' + query + '&cid=TIMESERIES_GRAPH_0&export=3&hl=en-us&' + convertTimePeriod(timePeriod);
	  console.log(url);
	  return url;
	};

	function getGoogleTrendsData(url, cb) {
	  var xhr = new XMLHttpRequest();

	  xhr.open('GET', url);

	  xhr.onreadystatechange = function () {
	    if (xhr.readyState != 4) return;

	    if (xhr.status != 200) {
	      cb(new Error("Error in downloading data"));return;
	    }
	    cb(null, parseGoogleTrendsResponce(xhr.responseText));
	  };

	  xhr.onerror = function (e) {
	    callbackFn(e);
	  };

	  xhr.send();
	}

	/**
	* Parse google trends data to correct format of Array
	*@function parseGoogleTrendsResponce
	*@param {string} response - responseText from Google
	*@return {array} - array of objects { date: Date, value: number }
	*/
	function parseGoogleTrendsResponce(response) {
	  // handle error
	  console.log(response);
	  var errorReg = new RegExp(/internal_error/);

	  if (response.match(errorReg)) {
	    console.log("Error in request to Google Trends - check parameter of timePeriod");
	    return [];
	  }

	  var answer = [];

	  var rg = new RegExp(/\/\/ Data table response\ngoogle\.visualization\.Query\.setResponse\((.*)\);/);
	  // change dates to suit JSON format
	  var regDate = new RegExp(/new Date\(.{8,10}\)/g);

	  var json_valid = JSON.parse(response.match(rg)[1].replace(regDate, function (str) {
	    // leave only number of the day: yyyy-mm-dd versus new Date(yyyy,mm,dd)
	    var tempRegDate = new RegExp(/new Date\((.{8,10})\)/);
	    return '"' + str.match(tempRegDate)[1] + '"';
	  })).table.rows;

	  for (var i = 0; i < json_valid.length; i++) {
	    var tempObj = json_valid[i].c,
	        dateParams = tempObj[0].v.split(',');
	    answer.push({
	      date: new Date(+dateParams[0], +dateParams[1], +dateParams[2]),
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
	function convertTimePeriod(timePeriod) {
	  var timePeriodMap = {
	    year: 'today',
	    month: 'today',
	    day: 'now'
	  };
	  var detailizationMap = {
	    month: 'm',
	    day: 'd'
	  };

	  // default detaization params
	  if (!timePeriod.detalization) {
	    timePeriod.detalization = 'day';
	  }

	  return 'date=' + timePeriodMap[timePeriod.type] + ' ' + timePeriod.value + '-' + detailizationMap[timePeriod.detalization];
	}

/***/ }
/******/ ]);