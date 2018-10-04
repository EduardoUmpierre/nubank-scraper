var cmd = require('node-cmd');

module.exports = function (user, password) {
    // Returns the promise
    return new Promise(function (resolve, reject) {
        // Runs the command and resolve the result
        cmd.get('casperjs ./scraper/test.js --user=' + user + ' --password=' + password, function (err, data, stderr) {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
}
