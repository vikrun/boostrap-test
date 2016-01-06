"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var prosjekt = new Prosjekt();
    prosjekt.constructor();
});

var Prosjekt = function () { };

Prosjekt.prototype.constructor = function () {
    var prosjekt = this;
    prosjekt.startup();
    prosjekt.btnNesteHenvendelse();
    prosjekt.btnParallelleProsjekt();
    prosjekt.btnAvdeling();
    prosjekt.btnDagligAnsvarlig();
    prosjekt.btnStudent();
    prosjekt.btnSaksbehandler();
    prosjekt.btnArbeidssted();
    prosjekt.cmbKategoriBehandlingsgrunnlag();
    prosjekt.txtFormaal();
}

Prosjekt.prototype.startup = function () {
    var utility = new Utility();
    utility.setDato("start_dato");
    utility.setDato("slutt_dato");
    utility.setDato("konsesjon_start_dato");
    utility.setDato("konsesjon_slutt_dato");
    utility.setDato("vedlegg_dato");
    $("#kategori_behandlingsgrunnlag_id").trigger("change");
};

Prosjekt.prototype.cmbKategoriBehandlingsgrunnlag = function () {
    $("#kategori_behandlingsgrunnlag_id").change(function() {
        if ($("#kategori_behandlingsgrunnlag_id").val() == 1) {
            $("#col_konsesjonspliktig_prosjekt").removeClass("hidden");
        } else {
            $("#col_konsesjonspliktig_prosjekt").addClass("hidden");
        }
    });
};

Prosjekt.prototype.btnParallelleProsjekt = function () {
    var prosjekt = this;
    $("#btn_parallelle_prosjekt").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/parallelleprosjekt";
    });
};

Prosjekt.prototype.btnAvdeling = function () {
    var prosjekt = this;
    $("#btn_avdeling").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/avdeling";
    });
};

Prosjekt.prototype.btnDagligAnsvarlig = function () {
    var prosjekt = this;
    $("#btn_daglig_ansvarlig").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/forsker";
    });
};

Prosjekt.prototype.btnStudent = function () {
    var prosjekt = this;
    $("#btn_student").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/student";
    });
};

Prosjekt.prototype.btnSaksbehandler = function () {
    var prosjekt = this;
    $("#btn_saksbehandler").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/saksbehandler";
    });
};

Prosjekt.prototype.btnArbeidssted = function () {
    var prosjekt = this;
    $("#btn_arbeidssted").click(function() {
        prosjekt.saveData();
        window.location.href = window.location.href + "/arbeidssted";
    });
};

Prosjekt.prototype.btnNesteHenvendelse = function () {
    $("#btn_neste_henvendelse").click(function() {
        var sluttdato = $("#slutt_dato").val();
        if (sluttdato == null) return;

        var parts = sluttdato.split(".");
        var year = parts[2];
        var month = parts[1];
        month = month.length > 1 ? month : '0' + month;
        var text = year + month;

        $("#neste_henvendelse").val(201);
        $("#ny_kontakt").val(text);
    });
};

Prosjekt.prototype.btnColor = function () {
    var utility = new Utility();
    var pnr = utility.getPnr();
    var database = new Database();
    var url = "/pes/api/prosjekt/" + pnr;
    var result = database.getData(url);

    if (result.kategori.parameterVerdi == 3) {
        console.log("test");
        $("#" + name).addClass("btn-success").removeClass("btn-default");
    } else if (result.kategori.parameterVerdi == 4) {
        console.log("test");
        $("#" + name).addClass("btn-warning").removeClass("btn-default");
    } else if (result.kategori.parameterVerdi == 5) {
        console.log("test");
        $("#" + name).addClass("btn-danger").removeClass("btn-default");
    } else {
        console.log("test");
        $("#" + name).addClass("btn-info").removeClass("btn-default");
    }
};


Prosjekt.prototype.saveData = function () {
    var utility = new Utility();
    var pnr = utility.getPnr();
    var url = "/pes/api/prosjekt/" + pnr + "/update";
    var database = new Database();
    database.updateData(url);

    ///set color on prosjekt button
};

Prosjekt.prototype.txtFormaal = function () {
    $('#formaal').focus(function () {
        $('#formaal').attr('rows', 15);
    });
    $('#formaal').blur(function () {
        $('#formaal').attr('rows', 2);
    });
};