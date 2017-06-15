'use strict';

const fs = require('fs');
function generateRandomUrl() {
    let url = '';
    const words = fs.readFileSync('/usr/share/dict/words', 'utf8')
    // const words = fs.readFileSync('/etc/dictionaries-common/words', 'utf8')
        .split('\n')
        .filter(function (word) {
          return /^[a-z]*$/.test(word);
        });

  for (let i = 0; i < 3; i++) {
    let temp = words[Math.floor(Math.random() * words.length)];
        // capitalize first letter
    url += temp.charAt(0).toUpperCase() + temp.slice(1);
  }
  return url;
}

function validateFields(givenFields, requiredFields) {
    // if (Object.keys(givenFields).length === 0) return {error: "Empty request."};

  for (const requiredItem of Object.keys(requiredFields)) {
    if (!(requiredItem in givenFields)) {
      return { error: `Missing ${requiredItem} in request.` };
    }

    if (typeof requiredFields[requiredItem] !== typeof givenFields[requiredItem]) {
      return { error: `${requiredItem} is the wrong type.` };
    }
  }
  return true;
}

function addPortfolioDataToFile(file, portfolioData) {
  if (portfolioData.length === 0) {
    throw new Error;
  }
  const dirname = __dirname.split('/').slice(0, -2).join('/');
  const data = fs.readFileSync(dirname + file, 'utf-8');
  const script = `<script>const portfolio = ${portfolioData}</script>`;
  return data.replace('<replace></replace>', script);
}

module.exports = { generateRandomUrl, validateFields, addPortfolioDataToFile };