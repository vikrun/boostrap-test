'use strict';

var ErrorLog = function () {
};

ErrorLog.prototype.log = function (xhr, status, error) {
    var message;

    switch (status) {
        case 404:
            message = 'File not found';
            break;
        case 500:
            message = 'Server error';
            break;
        case 0:
            message = 'Request aborted';
            break;
        default:
            message = 'Unknown error';
    }

    message += '\n';
    message += 'xhr.status: ' + xhr.status + '\n';
    message += 'xhr.statusText: ' + xhr.statusText + '\n';
    message += 'error: ' + error + '\n';

    console.log(message);
    alert(message);
};

