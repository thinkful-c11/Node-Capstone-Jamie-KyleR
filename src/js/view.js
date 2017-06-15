$(document).ready(function() {
    $('#portfolio-name').html(portfolio.name);
    $('#portfolio-value').html(formatMoney(portfolio.value));
});

function formatMoney(m) {
    /* 100000 => $100,000 */
    return '$' + String(m).match(/.{1,3}/g).join(',');
}




// <div class="info-box">
//       <div class="ticker"><h4>IBM</h4></div>
//       <div class="ticker-name"><h4>International Business Machines</h4></div>
//       <div class="shares-owned"><h4>Total Shares: </h4></div>
//       <p class="share-price">Share Price: $45.00</p>
//       <div class="shares-owned-value"><h4>Total Value: </h4></div>

//       <p> 
//         <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#sellModal" data-whatever="sell">
//           Sell
//         </button>
//         <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#buyModal" data-whatever="buy">
//           Buy
//         </button>
//         <div class="modal fade" id="sellModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//                 <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
//               </div>
//               <div class="modal-body">
//                 <h4>IBM</h4>
//                 <p class="share-price">Share Price: $45.00</p>
//                 <p class="owned-shares">Number of Shares: 10</p>
//                 <p class="owned-share-value">Total value: $450</p>
//                 <p>
//                   Shares to sell:
//                   <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
//                 </p>
//                   <label>
//                     <input type="checkbox"> Sell all
//                   </label>
//                 <p class="total-sell-amt">Total: </p>
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
//                 <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="modal fade" id="buyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//                 <h4 class="modal-title" id="myModalLabel">Place Trade</h4>
//               </div>
//               <div class="modal-body">
//                 <h4>IBM</h4>
//                 <p class="share-price">Share Price: $45.00</p>
//                 <p class="owned-shares">Number of Shares: 10</p>
//                 <p class="owned-share-value">Total value: $450</p>
//                 <p>
//                   Shares to buy:
//                   <input required type="text" pattern="\d*" class="accountvalue" placeholder="e.g. 10">
//                 </p>
//                  <label>
//                     <input type="checkbox"> Buy max
//                   </label>
//                 <p class="total-sell-amt">Total: </p>
//                 <!--<p class="account-balance">Account total: </p>-->
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
//                 <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
//               </div>
//             </div>
//           </div>
//         </div>

      
//     </div>

