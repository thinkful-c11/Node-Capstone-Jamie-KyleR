/* global $ portfolio */
function formatMoney(m) {
    /* 100000 => $100,000 */
    return m.toLocaleString('en-US', 
                        { style: 'currency', 
                        currency: 'USD' });
}

function setDashboard() {
    $('#portfolio-name').html(portfolio.name);
    $('#portfolio-value').html(formatMoney(portfolio.value));
}