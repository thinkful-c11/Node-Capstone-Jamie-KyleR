/* global $ */
'use strict';
function getDataFromAPI(ticker) {
  const results = {};
  $.getJSON('/api', { symbol: ticker }, function (response) {
    response.results.map(element =>
      results[element.symbol] =
      {
        ticker: element.symbol,
        name: element.name,
        price: element.lastPrice
      }
    );
  });
  return results;
}

function renderResults() {
  
}

function emptyResults() {
  $('#search-results').empty();
}

///EVENT LISTENER/////
function listenForSearch () {
  $('form #search-form').submit(function(event) {
    event.preventDefault();
    console.log('This is working');
    const results = getDataFromAPI();
  });
}


// <div class="info-box">
//     <div class="ticker"><h4>APPL</h4></div>
//     <div class="ticker-name"><h4>Apple</h4></div>
//     <p class="share-price">Share Price: $45.00</p>

//     <p>
//         <button id="order" type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#orderModal" data-whatever="order">
//           Order
//         </button>

//         <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//                 <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
//               </div>
//               <div class="modal-body">
//                 <h4>APPL</h4>
//                 <p class="share-price">Share Price: $45.00</p>
//                 <p>
//                   Shares to buy:
//                   <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
//                 </p>
//                   <label>
//                     <input type="checkbox"> Buy max
//                   </label>
//                 <p class="total-sell-amt">Cost: </p>
//                 <!--<p class="account-balance">Account balance: </p>-->
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-success" data-dismiss="modal">Buy</button>
//                 <button type="button" class="btn btn-primary" data-dismiss="modal">Short Sell</button>
//                 <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
//               </div>
//             </div>
//           </div>
//         </div>
//     </p>

//   </div>