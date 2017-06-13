const fs = require('fs');
function generateRandomUrl() {
    let url = '';
    const words = fs.readFileSync('/etc/dictionaries-common/words', 'utf8')
                .split('\n')
                .filter(function(word) {
                    return /^[a-z]*$/.test(word);
                });
               
    for (let i = 0; i < 3; i++) {
        let temp = words[Math.floor(Math.random() * words.length)].toLowerCase();
        url += temp.charAt(0).toUpperCase() + temp.slice(1);
    }
    return url;
}

function validateFields(requiredFields, givenFields) {
    if (Object.keys(givenFields).length === 0) return {error: "Empty request."};

    for (let i = 0, l = Object.keys(requiredFields).length; i < l; i++) {
        const givenItem = Object.keys(givenFields)[i];
        const requiredItem = Object.keys(requiredFields)[i];

        if (!(Object.keys(givenFields).includes(requiredItem))) {
            return {error: `Missing ${Object.keys(requiredFields)[i]} in request.`};
        }

        if (typeof requiredFields[requiredItem] !== typeof givenFields[givenItem]) {
            return {error: `${Object.keys(requiredFields)[i]} is the wrong type.`};
        }
    }
    return true;
}

module.exports = {generateRandomUrl, validateFields};