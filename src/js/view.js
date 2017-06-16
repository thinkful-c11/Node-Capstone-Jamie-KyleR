/* global $ portfolio setDashboard */
'use strict';

$(document).ready(function() {
  setDashboard();
  displayOwnedSecurities();
});

$('#123').on('change', function() {
  console.log(123);
});

// retrieves all of the current portfolio's securities
function querySecurities() {
  return fetch(`/security/${portfolio.link}`)
        .then(res => res.json());
}


function updatePurchasedSecurities(link, symbol, currentPrice, numShares) {
  $.ajax({
    url: '/security',
    type: 'PUT',
    data: JSON.stringify({
      link: link,
      symbol: symbol,
      currentPrice: currentPrice,
      numShares: numShares
    }),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: 'success'
  });
}


//displays owned securities on portfolio page//
function displayOwnedSecurities() {
    // $(this).closest(".info-box")
    // data-id="..."
  querySecurities()
    .then(function(data) {
      data.forEach(function(sec) {
        $('#securities-container').append(
                `<div class="info-box">
                  <div class="ticker"><h4>${sec.symbol}</h4></div>
                  <div class="ticker-name"><h4>${sec.name}</h4></div>
                  <div class="shares-owned"><h4>Total Shares: ${sec.numShares}</h4></div>
                  <p class="share-price">Share Price: $${sec.currentPrice}</p>
                  <div class="shares-owned-value"><h4>Total Value: $${sec.currentPrice * sec.numShares}</h4></div>
                  <p> 
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#sellModal" data-whatever="sell">
                      Sell
                    </button>
                    <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#buyModal" data-whatever="buy">
                      Buy
                    </button>
                  </p>
                </div>
                <div class="modal fade" id="sellModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
              </div>
              <div class="modal-body">
                <h4>${sec.symbol}</h4>
                <p class="share-price">Share Price: $${sec.currentPrice}</p>
                <p class="owned-shares">Number of Shares: ${sec.numShares}</p>
                <p class="owned-share-value">Total value: $${sec.currentPrice * sec.numShares}</p>
                <p id="to-sell-input">
                  Shares to sell:
                  <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
                </p>
                  <label>
                    <input id="sell-checkbox" type="checkbox"> Sell all
                  </label>
                <p class="total-sell-amt">Total: </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="buyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
              </div>
              <div class="modal-body">
                <h4>${sec.symbol}</h4>
                <p class="share-price">Share Price: $${sec.currentPrice}</p>
                <p class="owned-shares">Number of Shares: ${sec.numShares}</p>
                <p class="owned-share-value">Total value: $${sec.currentPrice * sec.numShares}</p>
                <p id="to-buy-input">
                  Shares to buy:
                  <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
                </p>
                 <label>
                    <input id="buy-checkbox" type="checkbox"> Buy max
                  </label>
                <p class="total-sell-amt">Total: </p>
                <!--<p class="account-balance">Account total: </p>-->
              </div>
              <div class="modal-footer">
                <button type="button" id="buy-shares" class="btn btn-primary" data-dismiss="modal">Submit</button>
                <button type="button" id="cancel" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>`
            ).find('#buy-shares').click(function(event) {
              updatePurchasedSecurities(portfolio.link, sec.symbol, sec.currentPrice, sec.numShares);
            });
      });

     

      $('#buy-checkbox').change(function() {
        if ($(this).is(':checked')) {
          const accountVal = unFormatMoney($('body').find('#portfolio-value').text());
          const sharePrice = unFormatMoney($(this).parent().siblings('.share-price').text().split(' ')[2]);
          $(this)
            .parent()
            .siblings('#to-buy-input')
            .children('input.accountvalue')
            .val(Math.floor(accountVal / sharePrice));
        } 
      });
      
      $('#sell-checkbox').change(function() {
        if ($(this).is(':checked')) {
          const ownedShares = unFormatMoney($(this).parent().siblings('.owned-shares').text());
          $(this)
            .parent()
            .siblings('#to-sell-input')
            .children('input.accountvalue')
            .val(ownedShares);
        } 
      });

    });
}