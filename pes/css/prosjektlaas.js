"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var prosjektlaas = new Prosjektlaas();
    prosjektlaas.constructor();
});

var Prosjektlaas = function () { };

Prosjektlaas.prototype.constructor = function () {

}

Prosjektlaas.prototype.locked = function () {
    //$("#btn_prosjekt").attr("disabled", "true");
    //$("#btn_utfall").attr("disabled", "true");
    //$("#btn_lukk").attr("disabled", "true");
    //$("#btn_parallelle_prosjekt").attr("disabled", "true");
    //$("#btn_institusjon").attr("disabled", "true");
    //$("#btn_daglig_ansvarlig").attr("disabled", "true");
    //$("#btn_student").attr("disabled", "true");
    //$("#btn_saksbehandler").attr("disabled", "true");
    //$("#btn_arbeidssted").attr("disabled", "true");
    //$("#btn_neste_henvendelse").attr("disabled", "true");

    //$("#personopplysningsloven_p8").attr("disabled", "true");
    //$("#personopplysningsloven_p9").attr("disabled", "true");

    //$("#row_helseregisterloven").attr("disabled", "true");
    //$("#row_helseregisterloven").attr("disabled", "true");
    //$("#row_henvendelser").attr("disabled", "true");

    $('body').addClass("locked");
    $('#btn_lukk').prop('disabled', false);
    $('#modal_laas').modal('show');
};

Prosjektlaas.prototype.getProsjektLaas = function () {
    var pnr = $("#prosjektnummer").val();
    var saksbehandlerId = $("#saksbehandler_id").val();

    //var database = new Database();
    //var url = "/pes/api/prosjekt_laas/" + id;
    //var result = database.getData(url);
};