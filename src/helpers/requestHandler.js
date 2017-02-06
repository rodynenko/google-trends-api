/**
* handle errors of options' object
*/
import timeConverter from './timeConverter';

function requestHandler(keywords, timePeriod, cb) {

  const url = `https://www.google.com/trends/fetchComponent?q=${keywords}&cid=TIMESERIES_GRAPH_0&export=3&hl=en-us&${timeConverter(timePeriod)}`;

  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) { cb(new Error("Error in downloading data")); return; }
    cb(null, xhr.responseText);
  };

  xhr.onerror = (error) => {
    cb(error);
  };

  xhr.send();

}

export default requestHandler;
