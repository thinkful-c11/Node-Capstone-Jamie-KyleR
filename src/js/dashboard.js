'use strict';
const {API_KEY} = require('./.env');

const appState = {
  accountValue: null,
  securities: []
};


let barchartURl = 'http://marketdata.websol.barchart.com/getQuote.json';

function getDataFromAPI (ticker, callback) {
  let query = {
    q: ticker,
    mode: 'i',
    api_key: API_KEY
  };

  $.getJSON(barchartURl, query, function(response) {
    const stockInfo = response.results.map(element => appState.securities.push({ticker: element.symbol, name: element.name, price: element.lastPrice}));
  });
}

//STATE MOD///
function setAccountValue (state) {
  const uniquename = window.location.pathname.split('/')[1];
  const hosturl = `${window.location.host}/portfolio/${uniquename}`;
  state.accountValue = $.getJSON(hosturl, function(response) {
    state.accountValue = response.value;
  });
}

function setSecurities (state) {
  const uniquename = window.location.pathname.split('/')[1];
  const hosturl = `${window.location.host}/security/${uniquename}`;
  $.getJSON(hosturl, function(response) {
    response.forEach(item => state.securities.push(item));
  });
}









