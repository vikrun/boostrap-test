'use strict';

var Utility = function () {
};

Utility.prototype.getPnr = function () {
    var pathArray = window.location.pathname.split('/');
    var code = pathArray[3];
    return code;
}

Utility.prototype.dateToText = function (date) {
    var date_object;
    var text_date;
    if (date == null || date == undefined) text_date = '';
    else {
        date_object = new Date(date);
        var day = date_object.getDate();
        if (day < 10) day = '0' + day;

        var month = (date_object.getMonth() + 1);
        if (month < 10) month = '0' + month;

        var year = date_object.getFullYear();
        text_date = day + '.' + month + '.' + year;
    }

    return text_date;
}

Utility.prototype.isParameterDefined = function (name) {
    return location.search.indexOf(name) >= 0;
}

Utility.prototype.getParameter = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Utility.prototype.setDato = function (name) {
    var dateOptions = {
        showOn: "focus",
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd.mm.yy',
        yearRange: "-100:+100",
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        dayNamesMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"]
    };

    $("#" + name).datepicker(dateOptions);
    $("#btn_" + name).click(function() {
        $("#" + name).datepicker("show");
    });
}

Utility.prototype.setColorOnButton = function (name, value, color) {
    if (value) {
        $("#" + name).addClass("btn-" + color).removeClass("btn-default");
    } else {
        $("#" + name).addClass("btn-default").removeClass("btn-" + color);
    }
}

Utility.prototype.clearForm = function () {
    $(":input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val("");
    $(":checkbox, :radio").prop("checked", false);
}

Utility.prototype.getUrlRoot = function () {
    var url = window.location.href;
    var temp = url.lastIndexOf('/') +1;
    url =  url.substring(0,temp);
    return url;
}

Utility.prototype.getPnr = function () {
    return $("#prosjektnummer").val();
}
