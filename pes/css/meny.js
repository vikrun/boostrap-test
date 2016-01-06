"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var meny = new Meny();
    meny.constructor();
});

var Meny = function () { };

Meny.prototype.constructor = function () {
    var meny = this;
    meny.clear();
    meny.showTabulator();
    meny.btnProsjekt();
    meny.btnInstilling();
    meny.btnHenvendelser();
    meny.btnHjemmelsgrunnlag();
    meny.btnPersonopplysningsloven();
    meny.btnHelseregisterloven();
    meny.btnEndringsopplysninger();
    meny.btnAvvik();
    meny.btnUtfall();
    meny.btnLinker();
    meny.btnLagre();
}

Meny.prototype.btnProsjekt = function () {
    var meny = this;
    $("#btn_prosjekt").click(function() {
        meny.saveData();
        meny.clear();
        $(this).addClass("active");
        $("#row_prosjekt").removeClass('hidden');

        $("#col_tittel").removeClass('hidden');
        $("#col_avdeling").removeClass('hidden');
        $("#col_daglig_ansvarlig").removeClass('hidden');
        $("#col_student").removeClass('hidden');
        $("#col_arbeidssted").removeClass('hidden');
        $("#col_saksbehandler").removeClass('hidden');
        $("#col_neste_henvendelse").removeClass('hidden');
    });
};

Meny.prototype.btnInstilling = function () {
    var meny = this;
    $("#btn_instilling").click(function() {
        meny.saveData();

        meny.clear();
        $(this).addClass("active");

        $("#row_prosjekt").removeClass('hidden');

        $("#col_tittel").addClass('hidden');
        $("#col_avdeling").addClass('hidden');
        $("#col_daglig_ansvarlig").addClass('hidden');
        $("#col_student").addClass('hidden');
        $("#col_arbeidssted").addClass('hidden');
        $("#col_saksbehandler").addClass('hidden');
        $("#col_neste_henvendelse").addClass('hidden');

        $("#col_instilling").removeClass('hidden');
    });
};

Meny.prototype.btnHenvendelser = function () {
    var meny = this;
    $("#btn_henvendelser").click(function() {
        meny.saveData();
        meny.clear();
        window.location.href = window.location.href + "/henvendelser";
    });
};

Meny.prototype.btnHjemmelsgrunnlag = function () {
    var meny = this;
    $("#btn_hjemmelsgrunnlag").click(function() {
        meny.clear();
        $("#btn_lovdata").addClass("active");
        $("#row_hjemmelsgrunnlag").removeClass('hidden');
    });
};

Meny.prototype.btnPersonopplysningsloven = function () {
    var meny = this;
    $("#btn_personopplysningsloven").click(function() {
        meny.clear();
        $("#btn_lovdata").addClass("active");
        $("#row_personopplysningsloven").removeClass('hidden');
    });
};

Meny.prototype.btnHelseregisterloven = function () {
    var meny = this;
    $("#btn_helseregisterloven").click(function() {
        meny.clear();
        $("#btn_lovdata").addClass("active");
        $("#row_helseregisterloven").removeClass('hidden');
    });
};

Meny.prototype.btnEndringsopplysninger = function () {
    var meny = this;
    $("#btn_endringsopplysninger").click(function() {
        meny.saveData();
        meny.clear();
        window.location.href = window.location.href + "/endringsopplysninger";
    });
};

Meny.prototype.btnAvvik = function () {
    var meny = this;
    $("#btn_avvik").click(function() {
        meny.clear();
        $(this).addClass("active");
        $("#row_avvik").removeClass('hidden');
    });
};

Meny.prototype.btnUtfall = function () {
    var meny = this;
    $("#btn_utfall").click(function() {
        meny.saveData();
        meny.clear();
        $(this).addClass("active");
        $("#row_utfall").removeClass('hidden');
    });
};

Meny.prototype.btnLinker = function () {
    var meny = this;
    $("#btn_linker").click(function() {
        meny.saveData();
    });
};

Meny.prototype.btnLagre = function () {
    var meny = this;
    $("#btn_lagre").click(function() {
        meny.saveData();
        meny.clear();
        $(this).addClass("active");
    });
};

Meny.prototype.showTabulator = function () {
    var utility = new Utility();
    if (utility.isParameterDefined("instilling")) {
        $("#btn_instilling").addClass("active");
        $("#col_instilling").removeClass('hidden');
    } else if (utility.isParameterDefined("hjemmelsgrunnlag")) {
        $("#btn_hjemmelsgrunnlag").addClass("active");
        $("#row_hjemmelsgrunnlag").removeClass('hidden');
    } else if (utility.isParameterDefined("personopplysningsloven")) {
        $("#btn_personopplysningsloven").addClass("active");
        $("#row_personopplysningsloven").removeClass('hidden');
    } else if (utility.isParameterDefined("helseregisterloven")) {
        $("#btn_helseregisterloven").addClass("active");
        $("#row_helseregisterloven").removeClass('hidden');
    } else if (utility.isParameterDefined("avvik")) {
        $("#btn_avvik").addClass("active");
        $("#row_avvik").removeClass('hidden');
    } else if (utility.isParameterDefined("utfall")) {
        $("#btn_utfall").addClass("active");
        $("#row_utfall").removeClass('hidden');
    } else {
        $("#btn_prosjekt").addClass("active");
        $("#row_prosjekt").removeClass('hidden');
    }

    window.history.pushState("", "", '/pes/prosjekt/' + utility.getPnr()); //change url without reload
};

Meny.prototype.clear = function () {
    $('[id^="btn_"]').removeClass("active");
    $("a").removeClass("active");

    $("#row_prosjekt").addClass('hidden');
    $("#col_instilling").addClass('hidden');
    $("#row_hjemmelsgrunnlag").addClass('hidden');
    $("#row_personopplysningsloven").addClass('hidden');
    $("#row_helseregisterloven").addClass('hidden');
    $("#row_endringsopplysning").addClass('hidden');
    $("#row_avvik").addClass('hidden');
    $("#row_utfall").addClass('hidden');
};

Meny.prototype.saveData = function () {
    var utility = new Utility();
    var pnr = utility.getPnr();
    var url = '/pes/api/prosjekt/' + pnr + '/update';
    var database = new Database();
    database.updateData(url);
};
