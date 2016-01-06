"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var lovdata = new Lovdata();
    lovdata.constructor();
});

var Lovdata = function () { };

Lovdata.prototype.constructor = function () {
    var lovdata = this;
    lovdata.btnColor();
    lovdata.change();
}

Lovdata.prototype.change = function () {
    var lovdata = this;

    $('#row_hjemmelsgrunnlag, #row_personopplysningsloven, #row_helseregisterloven').find('input[type=checkbox]').click (function(){
        lovdata.btnColor();
    });
};

Lovdata.prototype.btnColor = function () {
    if ($('#row_hjemmelsgrunnlag, #row_personopplysningsloven, #row_helseregisterloven').find('input[type=checkbox]').filter(':checked').length > 0) {
        $("#btn_lovdata").addClass("btn-info").removeClass("btn-default");
    } else {
        $("#btn_lovdata").addClass("btn-default").removeClass("btn-info");
    }
};
