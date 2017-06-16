/* global $ portfolio */
'use strict';

///this is formatting the money value into something that looks like funds///
function formatMoney(m) {
    /* 100000 => $100,000 */
  return '$' + String(m).match(/.{1,3}/g).join(',');
}


///this is setting the dashboard to name and values to equal what was submitted///
function setDashboard() {
  $('#portfolio-name').html(portfolio.name);
  $('#portfolio-value').html(formatMoney(portfolio.value));
}