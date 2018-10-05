$('#form').submit(function (e) {
    e.preventDefault();

    var button = $("#submit");

    button.html('Enviando...');
    button.prop('disabled', true);

    // Execute the post request
    $.post('/data', {
        user: $("#user").val(),
        password: $("#password").val()
    }, function (data) {
        var userLimits = $('.user-limits');
        var transactionList = $('.transaction-list');
        var limits = data.limits;

        userLimits.empty();
        transactionList.find('.transaction-list--item').remove();

        // Updates the user name
        $('#user-name').text(data.name);

        // Generates the limit list
        for (var limit in limits) {
            var newColumn = $('<div></div>', { class: 'col' });
            var title = $('<span></span>', { class: 'title', text: limits[limit].text });
            var value = $('<span></span>', { class: 'value', text: limits[limit].value });

            newColumn.append(title);
            newColumn.append(value);
            userLimits.append(newColumn);
        }

        // Generates the transaction list
        data.lastTransactions.forEach(function (element) {
            var newRow = $('<div></div>', { class: 'row transaction-list--item' });

            for (var item in element) {
                var newColumn = $('<div></div>', { class: 'col' });
                var category = $('<span></span>', { text: element[item] });

                newColumn.append(category);
                newRow.prepend(newColumn);
            }

            transactionList.append(newRow);
        });

        // Call the modal
        $('#user-data').modal();

        button.html('Enviar');
        button.prop('disabled', false);
    });
});