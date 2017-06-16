/* global $ setDashboard*/
'use strict';
$(document).ready(function() {
  setDashboard();
  listenForSearch();
});

//function making API call//
function getDataFromAPI(ticker) {
  // const results = {};
  return fetch(`/api?symbol=${ticker}`)
  .then(temp =>  temp.json());
  // .then(function (response) {
  //   response.results.map(element =>
  //     results[element.symbol] =
  //     {
  //       ticker: element.symbol,
  //       name: element.name,
  //       price: element.lastPrice
  //     }
  //   );
  //   return results;
  // });
}

//Call this to empty results from search on Trade page before a new search's results are displayed//
function emptyResults() {
  $('#search-results').empty();
}

//Event listener for search submission on Trade page//
function listenForSearch () {
  $('#search-form').submit(function(event) {
    event.preventDefault();
    console.log('This is working');
    getDataFromAPI($(this).find('input').val())
    .then(res => renderResults(res.results[0]));
  });
}


function renderResults(security) {
  emptyResults();
  $('#search-results').append(
    `<div class="info-box">
    <div class="ticker"><h4>${security.symbol}</h4></div>
    <div class="ticker-name"><h4>${security.name}</h4></div>
    <p class="share-price">Share Price: ${security.lastPrice}</p>
    <p>
        <button id="order" type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#orderModal" data-whatever="order">
          Order
        </button>

        <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
              </div>
              <div class="modal-body">
                <h4>${security.symbol}</h4>
                <p class="share-price">Share Price: ${security.lastPrice}</p>
                <p>
                  Shares to buy:
                  <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
                </p>
                  <label>
                    <input type="checkbox"> Buy max
                  </label>
                <p class="total-sell-amt">Cost: </p>
                <!--<p class="account-balance">Account balance: </p>-->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Buy</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Short Sell</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </p>
  </div>`
  );
}
///////This HTML should be rendering after a search is conducted and submitted////////

