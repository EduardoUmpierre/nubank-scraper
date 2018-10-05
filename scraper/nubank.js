var casper = require('casper').create({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
});
casper.options.waitTimeout = 25000;

var data = {};

// Starts a connection to the follow URL
casper.start('https://app.nubank.com.br/');

// When the selector exists, fill it with this data and submit it
casper.waitForSelector('form input[type=text]', function () {
    var options = casper.cli.options;

    this.fillSelectors('form', {
        'input[type=text]': options['user'].replace(/\'/g, ''),
        'input[type=password]': options['password'].replace(/\'/g, '')
    });
    
    this.click('button[type=submit]');
});

// Wait the form being destroyed
casper.waitWhileSelector('form');

// Gets the name and limits data
casper.waitForSelector('.limitbar .portion', function () {
    data.name = this.getElementInfo('.profile-title').text;
    data.limits = getLimits();
});

// Gets the transactions data
casper.waitForSelector('#feedTable > tbody .event-card.transaction', function () {
    data.lastTransactions = getLastTransactions();

    // Prints the data on console
    this.echo(JSON.stringify(data));

    // Closes the application
    this.exit();
});

// Runs the casper methods and then print the collected data
casper.run();

/**
 * Fetch the current page and get all limits values
 */
function getLimits() {
    var response = {};

    // Gets an array of available limits
    var limits = casper.evaluate(function () {
        var elements = document.querySelectorAll('.limitbar .portion');

        return [].map.call(elements, function (element) {
            var label = element.children[0].children[0].innerText.split('\n');
            var response = {};

            response[element.classList[1]] = {
                text: label[0].trim(),
                value: label[1].trim()
            };

            return response;
        });
    });

    // Converts the arrays of objects in a single object
    limits.forEach(function (item) {
        for (var attr in item) {
            response[attr] = item[attr];
        }
    });

    return response;
}

/**
 * Gets the last transactions
 */
function getLastTransactions() {
    var transactions = casper.evaluate(function () {
        var transactions = document.querySelectorAll('#feedTable > tbody .event-card.transaction');

        return [].map.call(transactions, function (transaction) {
            var data = transaction.children;
            var response = {};

            response = {
                category: data[1].innerText,
                title: data[2].innerText,
                amount: data[3].innerText,
                date: data[5].innerText
            };

            return response;
        })
    });

    return transactions;
}