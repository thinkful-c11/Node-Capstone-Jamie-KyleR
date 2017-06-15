/* global $ */
'use strict';
const {API_KEY} = require('./.env');

const appState = {
  accountValue: null,
  securities: []
};

let barchartURl = 'http://marketdata.websol.barchart.com/getQuote.json';

///STATE MOD///

function setAccountValue (state) {
  const uniquename = window.location.pathname.split('/')[1];
  const hosturl = `${window.location.host}/portfolio/${uniquename}`;
  state.accountValue = $.getJSON(hosturl, function(response) {
    state.accountValue = response.value;
  });
}

function setSearchResults (ticker, callback) {
  let query = {
    q: ticker,
    mode: 'i',
    api_key: API_KEY
  };

  $.getJSON(barchartURl, query, function(response) {
    response.results.map(element => 
      appState.securities.push(
        {
          ticker: element.symbol, 
          name: element.name, 
          price: element.lastPrice
        }
      ));
  });
}


///EVENT LISTENER/////
function listenForSearch () {
  $('form #search-form').submit(function(event) {
    event.preventDefault();
    console.log('This is working');
  });
}