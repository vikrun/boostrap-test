
var Database = function () { };

Database.prototype.getData = function (url) {
    var result;

    $.ajax({
        url: url,
        dataType: "json",
        async: false,
        success: function (data) {
            result = data;
        },
        error: function (xhr, status, error) {
            var errorLog = new ErrorLog();
            errorLog.log(xhr, status, error);
            window.location.href = "/ifdb/error";
        }
    });

    return result;
};

Database.prototype.updateData = function (url) {
    if (!window.btoa) window.btoa = $.base64.btoa;

    $.ajax({
        url: url,
        headers: {
            'Authorization': 'Basic ' + btoa(this.code)
        },
        type: 'POST',
        cache: false,
        dataType: 'json',
        async: false,
        data: $('form').serialize(),
        beforeSend: function () {
            $('#modal_loading').modal('show');
        },
        success: function () {

        },
        error: function (xhr, status, error) {
            var errorLog = new ErrorLog();
            errorLog.log(xhr, status, error);
            window.location.href = "/ifdb/error";
        },
        complete: function () {
            $('#modal_loading').modal('hide');
        }

    });
};
