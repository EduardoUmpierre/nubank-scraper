var cmd = require('node-cmd');

module.exports = function (user, password) {
    // Returns the promise
    return new Promise(function (resolve, reject) {
        var command = 'casperjs ./scraper/nubank.js --user=\'' + user + '\' --password=\'' + password + '\'';

        // Runs the command and resolve the result
        cmd.get(command, function (err, data, stderr) {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
}
