"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var hjemmelsgrunnlag = new Hjemmelsgrunnlag();
    hjemmelsgrunnlag.constructor();
});

var Hjemmelsgrunnlag = function () { };

Hjemmelsgrunnlag.prototype.constructor = function () {
    var helseregisterloven = this;
    helseregisterloven.btnColor();
    helseregisterloven.change();
    helseregisterloven.change();
    helseregisterloven.changeP8Ikke();
    helseregisterloven.changeP9Ikke();
}

Hjemmelsgrunnlag.prototype.change = function () {
    $('#row_personopplysningsloven').find('input[type=checkbox]').click (function(){
        var hjemmelsgrunnlag = new Hjemmelsgrunnlag();
        hjemmelsgrunnlag.btnColor();
    });
}

Hjemmelsgrunnlag.prototype.changeP8Ikke = function () {
    $('#p_8_ikke').on('change', function() {
        if ($(this).is(':checked')) $('#personopplysningsloven_p8').find('input[type=checkbox]').not(this).prop('checked', false);
    });
}

Hjemmelsgrunnlag.prototype.changeP9Ikke = function () {
    $('#p_9_ikke').on('change', function() {
        if ($(this).is(':checked')) $('#personopplysningsloven_p9').find('input[type=checkbox]').not(this).prop('checked', false);
    });
}

Hjemmelsgrunnlag.prototype.btnColor = function () {
    var value = ($('#row_hjemmelsgrunnlag').find('input[type=checkbox]').filter(':checked').length > 0);
    var utility = new Utility();
    utility.setColorOnButton("btn_hjemmelsgrunnlag", value, "info");
};

