"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var avvik = new Avvik();
    avvik.constructor();
});

var Avvik = function () { };

Avvik.prototype.constructor = function () {
    var avvik = this;

    avvik.btnColor();
    avvik.checkAvvik();
}

Avvik.prototype.checkAvvik = function () {
    var avvik = this;
    $('#row_avvik').find('input[type=checkbox]').click (function(){
        avvik.btnColor();
    });
};

Avvik.prototype.btnColor = function () {
    var value = ($('#row_avvik').find('input[type=checkbox]').filter(':checked').length > 0);
    var utility = new Utility();
    utility.setColorOnButton("btn_avvik", value, "danger");
};

