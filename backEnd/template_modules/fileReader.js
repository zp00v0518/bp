const fs = require('fs');

function fileReader(pathName, callback) {
  fs.readFile(pathName, (err, data) => {
    if (err) {
      // fs.readFile('../../frontEnd/404.html', (err, data) => {
        return callback(err, data);
      // });
    }
    return callback(null, data);
  });
}

module.exports = fileReader;
