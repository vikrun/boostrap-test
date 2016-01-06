"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var personopplysningsloven = new Personopplysningsloven();
    personopplysningsloven.constructor();
});

var Personopplysningsloven = function () { };

Personopplysningsloven.prototype.constructor = function () {
    var personopplysningsloven = this;
    personopplysningsloven.btnColor();
    personopplysningsloven.change();
}

Personopplysningsloven.prototype.change = function () {
    var personopplysningsloven = this;
    $('#row_personopplysningsloven').find('input[type=checkbox]').click (function(){
        personopplysningsloven.btnColor();
    });
}

Personopplysningsloven.prototype.btnColor = function () {
    var value = ($('#row_personopplysningsloven').find('input[type=checkbox]').filter(':checked').length > 0);
    var utility = new Utility();
    utility.setColorOnButton("btn_personopplysningsloven", value, "info");
}

