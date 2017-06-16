/* global $ portfolio setDashboard */
'use strict';

$(document).ready(function() {
    setDashboard();
    displayOwnedSecurities();
});

//retrieves all of the current portfolio's securities
async function querySecurities() {
    return await $.ajax({
        type: 'GET',
        url: `/security/${portfolio.link}`,
        async: true,
        success: function(data) {
            return data;
        }
    });
};


//displays owned securities on portfolio page//
function displayOwnedSecurities() {
    querySecurities()
    .then(function(data) {
        data.forEach(function(sec) {
            $('#securities-container').append(
                `<div class="info-box">
                  <div class="ticker"><h4>${sec.symbol}</h4></div>
                  <div class="ticker-name"><h4>${sec.name}</h4></div>
                  <div class="shares-owned"><h4>Total Shares: ${sec.numShares}</h4></div>
                  <p class="share-price">Share Price: ${sec.currentPrice}</p>
                  <div class="shares-owned-value"><h4>Total Value: ${sec.currentPrice * sec.numShares}</h4></div>
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
                <p class="share-price">Share Price: ${sec.currentPrice}</p>
                <p class="owned-shares">Number of Shares: ${sec.numShares}</p>
                <p class="owned-share-value">Total value: ${sec.currentPrice * sec.numShares}</p>
                <p>
                  Shares to sell:
                  <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
                </p>
                  <label>
                    <input type="checkbox"> Sell all
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
                <p class="share-price">Share Price: ${sec.currentPrice}</p>
                <p class="owned-shares">Number of Shares: ${sec.numShares}</p>
                <p class="owned-share-value">Total value: ${sec.currentPrice * sec.numShares}</p>
                <p>
                  Shares to buy:
                  <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
                </p>
                 <label>
                    <input type="checkbox"> Buy max
                  </label>
                <p class="total-sell-amt">Total: </p>
                <!--<p class="account-balance">Account total: </p>-->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
                `
            );
        });
    });
}