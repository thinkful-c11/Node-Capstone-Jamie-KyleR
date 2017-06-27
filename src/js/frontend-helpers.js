/* global $ portfolio */
/* eslint no-unused-vars: 0 */


// /this is formatting the money value into something that looks like funds///
function formatMoney(m) {
    /* 100000 => $100,000 */
  return m.toLocaleString('en-US',
    { style: 'currency',
      currency: 'USD' });
}

function unFormatMoney(m) {
  return Number(m.replace(/[^0-9.]+/g, ''));
}


// /this is setting the dashboard to name and values to equal what was submitted///
function setDashboard() {
  $('#portfolio-name').html(portfolio.name);
  $('#portfolio-value').html(formatMoney(portfolio.value));
  $('#view-link').append(`<a href="/portfolio/${portfolio.link}">Dashboard</a>`);
  $('#chart-link').append(`<a href="/portfolio/${portfolio.link}/charts">Charts</a>`);
  $('#trade-link').append(`<a href="/portfolio/${portfolio.link}/trade">Trade</a>`);
}
