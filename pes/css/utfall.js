"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var utfall = new Utfall();
    utfall.constructor();
});

var Utfall = function () { };

Utfall.prototype.constructor = function () {
    var utfall = this;
    utfall.setCmbEpostMottakerData();
    utfall.setCmbEpostData();
    utfall.cmbEpost();
};

Utfall.prototype.setCmbEpostMottakerData = function () {
    if (!$("#student_epost").val()) {
        $("#epost_mottaker option[value='student']").remove();
        $("#epost_mottaker option[value='forsker_student']").remove();
    }
};

Utfall.prototype.setCmbEpostData = function () {
    var database = new Database();
    var url = "/pes/api/epostmal/liste";
    var result = database.getData(url);
    $.each(result, function(i, data) {
        $('#btn_epost_maler').append("<li><a id=\"" + data.epostMalId + "\"><i class=\"fa fa-envelope-o\"></i> " + data.tittel + "</a></li>");
    });
};

Utfall.prototype.cmbEpost = function () {
    var utfall = this;
    $('#btn_epost_maler li > a').click(function(){
        var id = $(this).attr('id');
        var database = new Database();
        var url = "/pes/api/epostmal/" + id;
        var result = database.getData(url);
        var tittel = result.tittel;
        var text = result.tekst;

        var epost;
        var epostId = $("#epost_mottaker").val();
        if (epostId == "forsker") epost = $("#daglig_ansvarlig_epost").val();
        else if (epostId == "student") epost = $("#student_epost").val();
        else epost = $("#daglig_ansvarlig_epost").val() + ", " + $("#student_epost").val();

        var subject = $("#tittel").val().trim();
        subject = subject.replace("\"", "").replace("\'", "").replace("\r\n", " ").replace("\n", " ").replace("\r", " ");

        text = utfall.replaceText(text);
        var body = text;
        window.location = 'mailto:' + epost + '?subject=' + subject + '&body=' + body;
    });
};

Utfall.prototype.replaceText = function (text) {
    text = text.replace("{{prosjektnummer}}", $("#prosjektnummer").val());
    text = text.replace("{{tittel}}", $("#tittel").val());
    text = text.replace("{{formaal}}", $("#formaal").val());
    text = text.replace("{{daglig_ansvarlig_navn}}", $("#daglig_ansvarlig_navn").val());
    text = text.replace("{{student_navn}}", $("#student_navn_navn").val());
    text = text.replace("{{institusjon}}", $("#institusjon").val());
    text = text.replace("{{arbeidssted}}", $("#arbeidssted").val());
    text = text.replace("{{reg_dato}}", $("#reg_dato").val());
    text = text.replace("{{start_dato}}", $("#start_dato").val());
    text = text.replace("{{slutt_dato}}", $("#slutt_dato").val());
    text = text.replace("{{rek_nr}}", $("#rek_nr").val());
    text = text.replace("{{saksbehandler_meldeskjema}}", $("#saksbehandler_meldeskjema").val());
    text = text.replace("{{saksbehandler_endringsskjema}}", $("#saksbehandler_endringsskjema").val());

    return text;
};
