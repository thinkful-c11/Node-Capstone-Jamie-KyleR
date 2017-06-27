/* global $ window*/

// function to grab the data entered into the username and value fields on create account page//
function createPortfolio(name, value) {
  $.ajax({
    url: '/portfolio',
    type: 'POST',
    data: JSON.stringify({ name, value: +value }),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success(data) {
      window.location = `/portfolio/${data}`;
    },
  });
}

// Event listener for create portfolio button on opening page//
$('.create-port').submit((event) => {
  event.preventDefault();
  const username = $(this).find('#username').val();
  const accountValue = $(this).find('#accountValue').val();
  createPortfolio(username, accountValue);
});
