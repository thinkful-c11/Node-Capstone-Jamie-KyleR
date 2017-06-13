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

function validateFields() {
    
}

module.exports = {generateRandomUrl, validateFields};