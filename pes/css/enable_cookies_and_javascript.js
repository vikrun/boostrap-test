"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var cookie = new Cookie();
    cookie.constructor();
});

var Cookie = function () {
};

Cookie.prototype.constructor = function () {
    var dbCookie = this;
    dbCookie.checkCookie();
}

Cookie.prototype.checkCookie = function () {
    var dbCookie = this;
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled) ? true : dbCookie.showCookieFail();
};

Cookie.prototype.showCookieFail = function () {
    $("#enable_cookies").removeClass('hidden');
};

