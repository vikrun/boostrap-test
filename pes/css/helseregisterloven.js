"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var helseregisterloven = new Helseregisterloven();
    helseregisterloven.constructor();
});

var Helseregisterloven = function () { };

Helseregisterloven.prototype.constructor = function () {
    var helseregisterloven = this;
    helseregisterloven.btnColor();
    helseregisterloven.change();
}

Helseregisterloven.prototype.change = function () {
    var helseregisterloven = this;
    $('#row_helseregisterloven').find('input[type=checkbox]').click (function(){
        helseregisterloven.btnColor();
    });
}

Helseregisterloven.prototype.btnColor = function () {
    var value = ($('#row_helseregisterloven').find('input[type=checkbox]').filter(':checked').length > 0);
    var utility = new Utility();
    utility.setColorOnButton("btn_helseregisterloven", value, "info");
}
