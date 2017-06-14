/* global $ */
'use strict';
const appState = {
  accountValue: null,
  securities: {}
};

function getDataFromAPI (ticker) {
  $.getJSON('/api', {symbol: ticker}, function(response) {
    response.results.map(element => 
      appState.securities[element.symbol] = 
        {
          ticker: element.symbol, 
          name: element.name, 
          price: element.lastPrice
        }
      );
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









