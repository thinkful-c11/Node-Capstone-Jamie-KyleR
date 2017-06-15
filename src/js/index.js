/* global $ */
'use strict';

$('.create-port').submit(function (event) {
  event.preventDefault();
  const username = $(this).find('#username').val();
  const accountValue = $(this).find('#accountValue').val();
  createPortfolio(username, accountValue);
});

function createPortfolio(name, value) {
  $.ajax({
    url: '/portfolio',
    type: 'POST',
    data: JSON.stringify({name: name, value: +value}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function(data) {
      window.location = '/portfolio/' + data;
    }
  });
}