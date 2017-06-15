/* global $ portfolio */
function formatMoney(m) {
    /* 100000 => $100,000 */
    return '$' + String(m).match(/.{1,3}/g).join(',');
}

function setDashboard() {
    $('#portfolio-name').html(portfolio.name);
    $('#portfolio-value').html(formatMoney(portfolio.value));
}