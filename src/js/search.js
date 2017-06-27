/* global $ setDashboard document fetch unFormatMoney portfolio */

// function making API call//
function getDataFromAPI(ticker) {
  return fetch(`/api?symbol=${ticker}`)
  .then(temp => temp.json());
}

/* Call this to empty results from search on Trade page
before a new search's results are displayed */
function emptyResults() {
  $('#search-results').empty();
}

function renderInvalidSecurity() {
  $('#search-results').append(`<div class="alert alert-danger" role="alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="sr-only">Error:</span>
    That is not a valid security.
  </div>`);
}

function postPurchasedSecurityOnDashboard(link, name, symbol, currentPrice, numShares) {
  $.ajax({
    url: '/security',
    type: 'POST',
    data: JSON.stringify({
      link,
      name,
      symbol,
      initialPrice: currentPrice,
      numShares,
    }),
    dataType: 'json',
    async: true,
    contentType: 'application/json; charset=utf-8',
    success() {

    },
  });
}

function renderResults(security) {
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
                <p class="share-price">Share Price: $${security.lastPrice}</p>
                <p class="number-shares-to-buy">
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
                <button type="button" id="order-buy" class="btn btn-success" data-dismiss="modal">Buy</button>
                <button type="button" id="short-sell" class="btn btn-primary" data-dismiss="modal">Short Sell</button>
                <button type="button" id="cancel-order" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </p>
  </div>`,
  ).find('#order-buy').click(() => {
    const numberShares = unFormatMoney($(this).parent().siblings('.modal-body').find('.accountvalue')
                        .val());
    postPurchasedSecurityOnDashboard(
      portfolio.link, security.name, security.symbol, security.lastPrice, numberShares);
  });
  $('#short-sell').click(() => {
  });
  $('#cancel-order').click(() => {
  });
  $('input[type="checkbox"]').change(() => {
    if ($(this).is(':checked')) {
      const accountVal = unFormatMoney($('body').find('#portfolio-value').text());
      const sharePrice = unFormatMoney($(this).parent().siblings('.share-price').text()
                        .split(' ')[2]);
      $(this)
        .parent()
        .parent()
        .find('.number-shares-to-buy')
        .children('input')
        .val(Math.floor(accountVal / sharePrice));
    }
  });
}

// Event listener for search submission on Trade page//
function listenForSearch() {
  $('#search-form').submit((event) => {
    event.preventDefault();
    emptyResults();
    getDataFromAPI($(this).find('input').val())
    .then((res) => {
      if (res.results === null) {
        renderInvalidSecurity();
      } else {
        renderResults(res.results[0]);
      }
    });
  });
}


$(document).ready(() => {
  setDashboard();
  listenForSearch();
});

