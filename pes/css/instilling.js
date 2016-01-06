"use strict";
/* global $:false, jQuery:false */
/*jshint unused: true */

$(function () {
    var instilling = new Instilling();
    instilling.constructor();
});

var Instilling = function () { };

Instilling.prototype.constructor = function () {
    var instilling = this;
    instilling.startup();
}

Instilling.prototype.startup = function () {
    var instilling = this;
    instilling.btnColor();
    instilling.setLocked();
    instilling.change();

    instilling.btnGenererTekstNorsk();
    instilling.btnGenererTekstEngelsk();
    instilling.btnIkkeMeldepliktigNorsk();
    instilling.btnIkkeMeldepliktigEngelsk();
};

Instilling.prototype.setLocked = function () {
    var database = new Database();
    var url = "/pes/api/prosjekt/" + $('#prosjektnummer').val();
    var result = database.getData(url);
    var ferdigBehandlet = (result.kategoriProsjektstatus.parameterVerdi == 3);
    var instilling = this;

    if (ferdigBehandlet) instilling.locked();
    else instilling.unlocked();
};

Instilling.prototype.unlocked = function () {
    $('#btn_generer_tekst_instilling').prop('disabled', false);
    $('#btn_ikke_meldepliktig_instilling').prop('disabled', false);
    $('#instilling').prop('readonly', false);
};

Instilling.prototype.locked = function () {
    $('#btn_generer_tekst_instilling').prop('disabled', true);
    $('#btn_ikke_meldepliktig_instilling').prop('disabled', true);
    $('#instilling').prop('readonly', true);
};

Instilling.prototype.change = function () {
    var instilling = this;
    $('#instilling').bind('input propertychange', function() {
        instilling.btnColor();
    });
};

Instilling.prototype.btnGenererTekstNorsk = function () {
    var instilling = this;
    $("#btn_generer_tekst_norsk").click(function() {
        var text = instilling.text(false);
        var txtInstilling = $("#instilling");
        txtInstilling.val(txtInstilling.val() + text);
        instilling.btnColor();
    });
};

Instilling.prototype.btnGenererTekstEngelsk = function () {
    var instilling = this;
    $("#btn_generer_tekst_engelsk").click(function() {
        var text = instilling.text(true);
        var txtInstilling = $("#instilling");
        txtInstilling.val(txtInstilling.val() + text);
        instilling.btnColor();
    });
};

Instilling.prototype.btnIkkeMeldepliktigNorsk = function () {
    var instilling = this;
    $("#btn_ikke_meldepliktig_norsk").click(function() {
        var text = instilling.ikkeMeldepliktigText(false);
        var txtInstilling = $("#instilling");
        txtInstilling.val(txtInstilling.val() + text);

        instilling.ikkeMeldepliktig();
        instilling.btnColor();
    });
};

Instilling.prototype.btnIkkeMeldepliktigEngelsk = function () {
    var instilling = this;
    $("#btn_ikke_meldepliktig_engelsk").click(function() {
        var text = instilling.ikkeMeldepliktigText(true);
        var txtInstilling = $("#instilling");
        txtInstilling.val(txtInstilling.val() + text);

        instilling.ikkeMeldepliktig();
        instilling.btnColor();
    });
};

Instilling.prototype.ikkeMeldepliktig = function () {
    $('#ny_kontakt').val('');
    $('#neste_henvendelse').val('55');

    $('#kategori_behandlingsgrunnlag_id').val('4');
    $('#kategori_status_id').val('6');

    $("#p_8_ikke").prop('checked', true).trigger("change");
    $("#p_9_ikke").prop('checked', true).trigger("change");

    if ($('#btn_lovdata').hasClass("btn-default")) {
        $("#btn_lovdata").removeClass("btn-default").addClass("btn-info");
    }

    if ($('#btn_hjemmelsgrunnlag').hasClass("btn-default")) {
        $("#btn_hjemmelsgrunnlag").removeClass("btn-default").addClass("btn-info");
    }
};

Instilling.prototype.text = function (engelsk) {
    var utility = new Utility();
    var pnr = utility.getPnr();
    var database = new Database();
    var url = "/pes/api/prosjekt/" + pnr;
    var result = database.getData(url);

    var databehandler_tekst = "xxx";

    var NY_LINJE = "\n";
    var text = NY_LINJE + NY_LINJE;

    if (result.andreInstitusjonerNasjonalt) {
        if (!engelsk) {
            text += "Prosjektet er en nasjonal samarbeidsstudie. ";
            text += result.institusjon.avdeling + " er behandlingsansvarlig institusjon. ";
            text += "Personvernombudet forutsetter at ansvaret for behandlingen av personopplysninger er avklart mellom institusjonene. ";
            text += "Vi anbefaler at det inngås en avtale som omfatter ansvarsfordeling, ansvarsstruktur, hvem som initierer prosjektet, bruk av data og eventuelt eierskap. ";
        } else {
            text += "The research project is a national collaboration. ";
            text += result.institusjon.avdeling + " is the responsible data controller. ";
            text += "The Data Protection Official for Research presupposes that the responsibility for processing personal data has been formally clarified between the institutions. ";
            text += "We recommend that the division of responsibilities is formalized in a contract that includes structure of liabilities, who initiated the project, use of data and ownership. ";
        }

        text += NY_LINJE + NY_LINJE;
    }


    if (result.andreInstitusjonerInternasjonalt) {
        if (!engelsk) {
            text += "Prosjektet er en internasjonal samarbeidsstudie. ";
            text += result.institusjon.avdeling + " er behandlingsansvarlig institusjon for den norske delen. ";
            text += "Personvernombudet forutsetter at ansvaret for behandlingen av personopplysninger er avklart mellom institusjonene. ";
            text += "Vi anbefaler at det inngås en avtale som omfatter ansvarsfordeling, ansvarsstruktur, hvem som initierer prosjektet, bruk av data og eventuelt eierskap. ";
        } else {
            text += "The research project is an international collaboration. ";
            text += result.institusjon.avdeling + "  is the responsible data controller. ";
            text += "The Data Protection Official for Research presupposes that the responsibility for processing personal data has been formally clarified between the institutions. ";
            text += "We recommend that the division of responsibilities is formalized in a contract that includes structure of liabilities, who initiated the project, use of data and ownership. ";
        }
        text += NY_LINJE + NY_LINJE;
    }

    if (result.sensitivOpplysning) {
        if (!engelsk) text += "Formålet er ";
        else text += "The purpose of the project is ";
        text += result.formaal + ".";
        text += NY_LINJE + NY_LINJE;
    }

    if (result.samtykkeInnhentes && !result.utvalgInformeresSkriftlig && result.utvalgInformeresMuntlig) {
        if (!engelsk) {
            text += "Ifølge prosjektmeldingen skal utvalget informeres muntlig om prosjektet og samtykke til deltakelse. ";
            text += "For å tilfredsstille kravet om et informert samtykke etter loven, må utvalget informeres om følgende: ";
            text += NY_LINJE + NY_LINJE;
            text += "- hvilken institusjon som er ansvarlig" + NY_LINJE;
            text += "- prosjektets formål / problemstilling" + NY_LINJE;
            text += "- hvilke metoder som skal benyttes for datainnsamling " + NY_LINJE;
            text += "- hvilke typer opplysninger som samles inn  " + NY_LINJE;
            text += "- at opplysningene behandles konfidensielt og hvem som vil ha tilgang " + NY_LINJE;
            text += "- at det er frivillig å delta og at man kan trekke seg når som helst uten begrunnelse " + NY_LINJE;
            text += "- dato for forventet prosjektslutt  " + NY_LINJE;
            text += "- at data anonymiseres ved prosjektslutt  " + NY_LINJE;
            text += "- hvorvidt enkeltpersoner vil kunne gjenkjennes i den ferdige oppgaven  " + NY_LINJE;
            text += "- kontaktopplysninger til forsker, eller student/veileder. " + NY_LINJE;

        } else {

            text += "According to the notification form, participants will receive verbal information about the project and give consent to participation. ";
            text += "In order to satisfy the requirement of informed consent of the law, ";
            text += "the participants must be informed of the following: ";
            text += NY_LINJE + NY_LINJE;
            text += "- which institution is responsible" + NY_LINJE;
            text += "- the purpose of the project / the research question(s)" + NY_LINJE;
            text += "- which methods will be used to collect personal data" + NY_LINJE;
            text += "- what kind of information will be collected" + NY_LINJE;
            text += "- that information will be treated confidentially and who will have access to it" + NY_LINJE;
            text += "- that participation is voluntary and that one may withdraw at any time without stating a reason" + NY_LINJE;
            text += "- the expected end date of the project" + NY_LINJE;
            text += "- that all personal data will be anonymized or deleted when the project ends" + NY_LINJE;
            text += "- whether individuals will be recognisable in the final thesis/publication" + NY_LINJE;
            text += "- contact information of the researcher, or student and supervisor" + NY_LINJE;
        }

        text += NY_LINJE;
    }

    if (result.utvalgInformeresSkriftlig && result.samtykkeInnhentes) {
        if (!engelsk) {
            text += "Utvalget informeres skriftlig ";
            if (result.utvalgInformeresMuntlig) text += "og muntlig ";
            text += "om prosjektet og samtykker til deltakelse. Informasjonsskrivet er godt utformet. ";
            text += NY_LINJE + NY_LINJE;
            text += "--- Informasjonsskriv og samtykkeerklæring er noe mangelfullt utformet. Vi ber derfor om at følgende endres/tilføyes: ";
            text += NY_LINJE + NY_LINJE;
            text += "--- Revidert informasjonsskriv skal sendes til personvernombudet@nsd.no før utvalget kontaktes. ";
        } else {
            text += "The sample will receive written ";
            if (result.utvalgInformeresMuntlig) text += "and oral ";
            text += "information about the project, and give their consent to participate. The letter of information is well formulated. ";
            text += NY_LINJE + NY_LINJE;
            text += "--- The letter of information and consent form are somewhat incomplete, and we ask that the following is changed/added: ";
            text += NY_LINJE + NY_LINJE;
            text += "--- We ask that the revised letter of information is sent to  personvernombudet@nsd.no before contact with the sample is established. ";
        }

        text += NY_LINJE + NY_LINJE;
    }

    if (result.utvalgAlderBarn && result.utvalgBarnSamtykkeFraForeldre) {
        if (!engelsk) {
            text += "Merk at når barn skal delta aktivt, er deltagelsen alltid frivillig for barnet, selv om de foresatte samtykker. ";
            text += "Barnet bør få alderstilpasset informasjon om prosjektet, og det må sørges for at de forstår at deltakelse er ";
            text += "frivillig og at de når som helst kan trekke seg dersom de ønsker det.";
        } else {
            text += "Please note that when children actively participate in research, participation is always voluntary, ";
            text += "even though parents have given their consent. Children should be given information adapted to their age, ";
            text += "and it must be made sure that they understand that their participation is voluntary and that they can withdraw at any time.";
        }

        text += NY_LINJE + NY_LINJE;
    }

    if (result.sensitivOpplysning) {
        if (!engelsk) {
            var tempText = "Det behandles sensitive personopplysninger om ";
            if (result.sensitivOpplysningEtnisitet) tempText += "etnisk bakgrunn eller politisk/filosofisk/religiøs oppfatning, ";
            if (result.sensitivOpplysningStraffbarHandling) tempText += "strafferettslige forhold, ";
            if (result.sensitivOpplysningHelseforhold) tempText += "helseforhold, ";
            if (result.sensitivOpplysningSeksuelleForhold) tempText += "seksuelle forhold, ";
            if (result.sensitivOpplysningMedlemskapFagforening) tempText += "medlemskap i fagforeninger";
            text += tempText + ". ";
        } else {
            var tempText = "There will be registered sensitive information relating to ";
            if (result.sensitivOpplysningEtnisitet) tempText += "ethnic origin or political/philosophical/religious beliefs, ";
            if (result.sensitivOpplysningStraffbarHandling) tempText += "criminal offences, ";
            if (result.sensitivOpplysningHelseforhold) tempText += "health, ";
            if (result.sensitivOpplysningSeksuelleForhold) tempText += "sex life, ";
            if (result.sensitivOpplysningMedlemskapFagforening) tempText += "trade-union membership";
            text += tempText + ". ";
        }

        text += NY_LINJE + NY_LINJE;
    }

    if (result.tredjepersonInformeresIkke) {
        if (!engelsk) {
            text += "Det behandles enkelte opplysninger om tredjeperson. Det skal kun registreres opplysninger som er nødvendig for formålet med prosjektet. ";
            text += "Opplysningene skal være av mindre omfang og ikke sensitive, og skal anonymiseres i publikasjon. ";
            text += "Så fremt personvernulempen for tredjeperson reduseres på denne måten, kan prosjektleder unntas fra informasjonsplikten overfor tredjeperson, ";
            text += "fordi det anses uforholdsmessig vanskelig å informere. ";
        } else {
            text += "There will be registered some information about third persons. ";
            text += "Please note that identifying information about third persons should only be registered when necessary for the scientific purpose of the project. ";
            text += "The information should be reduced to a minimum and should not be sensitive, and must be made anonymous in the publication. ";
            text += "As long as the disadvantage for third persons is reduced in this way, the project leader can be exempted from the duty to inform third persons. ";
        }

        text += NY_LINJE + NY_LINJE;
    }

    if (!engelsk) {
        text += "Personvernombudet legger til grunn at forsker etterfølger " + result.institusjon.avdeling + " sine interne rutiner for datasikkerhet. ";
    } else {
        text += "The Data Protection Official presupposes that the researcher follows internal routines of " + result.institusjon.avdeling + " regarding data security. ";
    }

    if (result.datamaterialetOppbevaresPrivatDatamaskin || result.datamaterialetOppbevaresMobileLagringsenheter || result.personopplysningerOverforesViaInternett) {
        if (!engelsk) {
            text += "Dersom personopplysninger skal ";
            if (result.personopplysningerOverforesViaInternett) {
                text += "sendes elektronisk ";
                if (result.datamaterialetOppbevaresPrivatDatamaskin || result.datamaterialetOppbevaresMobileLagringsenheter) text += "eller ";
            }

            if (result.datamaterialetOppbevaresPrivatDatamaskin || result.datamaterialetOppbevaresMobileLagringsenheter) text += "lagres på ";
            if (result.datamaterialetOppbevaresPrivatDatamaskin) text += "privat pc /";
            if (result.datamaterialetOppbevaresMobileLagringsenheter) text += "mobile enheter";
            text += ", bør opplysningene krypteres tilstrekkelig.";
        } else {
            text += "If personal data is to be ";
            if (result.personopplysningerOverforesViaInternett) {
                text += "sent by email ";
                if (result.datamaterialetOppbevaresPrivatDatamaskin || result.datamaterialetOppbevaresMobileLagringsenheter) text += "or ";
            }

            if (result.datamaterialetOppbevaresPrivatDatamaskin || result.datamaterialetOppbevaresMobileLagringsenheter) text += "stored on ";
            if (result.datamaterialetOppbevaresPrivatDatamaskin) text += "a private computer /";
            if (result.datamaterialetOppbevaresMobileLagringsenheter) text += "portable storage devices";
            text += ", the information should be adequately encrypted.";
        }
    }

    text += NY_LINJE + NY_LINJE;

    if (result.databehandler) {
        if (!engelsk) {
            text += databehandler_tekst + " er databehandler for prosjektet. ";
            text += result.institusjon.avdeling + " skal inngå skriftlig avtale med " + databehandler_tekst + " ";
            text += "om hvordan personopplysninger skal behandles, jf. personopplysningsloven § 15. ";
            text += "For råd om hva databehandleravtalen bør inneholde, se Datatilsynets veileder: http://www.datatilsynet.no/Sikkerhet-internkontroll/Databehandleravtale/. ";
        } else {
            text += databehandler_tekst + " is data processor for the project. ";
            text += result.institusjon.avdeling + " should make a data processing agreement with " + databehandler_tekst + " ";
            text += "regarding the processing of personal data, cf. Personal Data Act § 15. ";
            text += "For advice on what the data processor agreement should contain, please see: http://www.datatilsynet.no/English/Publications/Data-processor-agreements/. ";
        }
        text += NY_LINJE + NY_LINJE;
    }

    if (result.personopplysningerPubliseresDirekte || result.personopplysningerPubliseresIndirekte) {
        if (!engelsk) {
            text += "Det oppgis at personopplysninger skal publiseres. Personvernombudet legger til grunn at det foreligger eksplisitt samtykke fra den enkelte til dette. ";
            text += "Vi anbefaler at deltakerne gis anledning til å lese igjennom egne opplysninger og godkjenne disse før publisering.";
        } else {
            text += "It is stated that personally identifiable information will be published. ";
            text += "The Data Protection Official presupposes that the participants give their explicit consent to this. Further, ";
            text += "we recommend that participants are given the opportunity to read through their own information and give their approval before publication.";
        }

        text += NY_LINJE + NY_LINJE;
    }

    if (!engelsk) {
        text += "Forventet prosjektslutt er " + utility.dateToText(result.sluttDato) + ". Ifølge prosjektmeldingen skal innsamlede opplysninger da ";
    } else {
        text += "Estimated end date of the project is " + utility.dateToText(result.sluttDato) + ". According to the notification form all collected data will ";
    }

    text += NY_LINJE;

    if (result.datamaterialetOppbevaresMedPersonidentifikasjon) {
        if (!engelsk) text += "--- oppbevares med personidentifikasjon " + NY_LINJE;
        else text += "--- be stored with personal identification " + NY_LINJE;
        text += "" + utility.dateToText(result.datamaterialetVarighetDato) + " " + NY_LINJE;
    }

    if (result.datamaterialetOppbevaresForOppfolgingsstudier) {
        if (!engelsk) text += "-- for oppfølginsstudier/videre forskning " + NY_LINJE;
        else text += "-- for follow-up studies/further research " + NY_LINJE;
    }

    if (result.datamaterialetOppbevaresForUndervisningsformaal) {
        if (!engelsk) text += "-- for undervisningsformål " + NY_LINJE;
        else text += "-- for teaching purposes " + NY_LINJE;
    }

    if (result.datamaterialetOppbevaresForAnnet) {
        text += "-- " + result.datamaterialetOppbevaresForAnnetTekst + NY_LINJE;
    }

    if (result.datamaterialetAnonymiseres) {
        if (!engelsk) {
            text += "--- anonymiseres. " + NY_LINJE;
            text += "Anonymisering innebærer å bearbeide datamaterialet slik at ingen enkeltpersoner kan gjenkjennes. Det gjøres ved å: ";
            text += NY_LINJE;
            text += "- slette direkte personopplysninger (som navn/koblingsnøkkel) " + NY_LINJE;
            text += "- slette/omskrive indirekte personopplysninger (identifiserende sammenstilling av bakgrunnsopplysninger som f.eks. bosted/arbeidssted, alder og kjønn) " + NY_LINJE;

            if (result.datamaterialetOppbevaresLydopptak || result.datamaterialetOppbevaresVideoopptakFotografi) text += "- slette digitale lyd-/bilde- og videoopptak " + NY_LINJE;
        } else {
            text += "--- be made anonymous by this date. " + NY_LINJE;
            text += "Making the data anonymous entails processing it in such a way that no individuals can be recognised. This is done by: ";
            text += NY_LINJE;
            text += "- deleting all direct personal data (such as names/lists of reference numbers) " + NY_LINJE;
            text += "- deleting/rewriting indirectly identifiable data (i.e. an identifying combination of background variables, such as residence/work place, age and gender) " + NY_LINJE;

            if (result.datamaterialetOppbevaresLydopptak || result.datamaterialetOppbevaresVideoopptakFotografi) text += "- deleting digital audio and video files " + NY_LINJE;
        }

        text += NY_LINJE;
    }

    if (result.databehandler && result.datamaterialetAnonymiseres) {
        if (!engelsk) {
            text += "Vi gjør oppmerksom på at også databehandler (";
            text += databehandler_tekst;
            text += ") må slette personopplysninger tilknyttet prosjektet i sine systemer. Dette inkluderer eventuelle logger og koblinger mellom IP-/epostadresser og besvarelser.";
        } else {
            text += "Please note the data processor (";
            text += databehandler_tekst;
            text += ") must delete all personal information connected to the project, including any logs and links between IP/email addresses and answers.";
        }
    }

    return text;
};

Instilling.prototype.ikkeMeldepliktigText = function (engelsk) {
    var NY_LINJE = "\n";
    var text = NY_LINJE + NY_LINJE;

    if (!engelsk) {
        text += "Vi kan ikke se at det behandles personopplysninger med elektroniske hjelpemidler, eller at det opprettes manuelt personregister som inneholder sensitive personopplysninger. ";
        text += "Prosjektet vil dermed ikke omfattes av meldeplikten etter personopplysningsloven. ";
        text += NY_LINJE + NY_LINJE;

        text += "Det ligger til grunn for vår vurdering at alle opplysninger som behandles elektronisk i forbindelse med prosjektet er anonyme. ";
        text += NY_LINJE + NY_LINJE;

        text += "Med anonyme opplysninger forstås opplysninger som ikke på noe vis kan identifisere enkeltpersoner i et datamateriale, verken: " + NY_LINJE;
        text += "-	direkte via personentydige kjennetegn (som navn, personnummer, epostadresse el.) " + NY_LINJE;
        text += "-	indirekte via kombinasjon av bakgrunnsvariabler (som bosted/institusjon, kjønn, alder osv.) " + NY_LINJE;
        text += "-	via kode og koblingsnøkkel som viser til personopplysninger (f.eks. en navneliste) " + NY_LINJE;
        text += "-	eller via gjenkjennelige ansikter e.l. på bilde eller videoopptak. " + NY_LINJE;
        text += NY_LINJE;
        text += "Personvernombudet legger videre til grunn at navn/samtykkeerklæringer ikke knyttes til sensitive opplysninger. ";

    } else {

        text += "Based on the information we have received about the project, the Data Protection Official cannot see that the project will entail a processing of personal data by electronic means, ";
        text += "or an establishment of a manual personal data filing system containing sensitive data. The project will therefore not be subject to notification according to the Personal Data Act. ";
        text += NY_LINJE + NY_LINJE;

        text += "The Data Protection Official presupposes that all information processed using electronic equipment in the project is anonymous. ";
        text += NY_LINJE + NY_LINJE;

        text += "Anonymous information is defined as information that cannot identify individuals in the data set in any of the following ways: " + NY_LINJE;
        text += "-	directly, through uniquely identifiable characteristic (such as name, social security number, email address, etc.) " + NY_LINJE;
        text += "-	indirectly, through a combination of background variables (such as residence/institution, gender, age, etc.) " + NY_LINJE;
        text += "-	through a list of names referring to an encryption formula or code, or " + NY_LINJE;
        text += "-	through recognizable faces on photographs or video recordings. " + NY_LINJE;
        text += NY_LINJE;
        text += "Furthermore, the Data Protection Official presupposes that names/consent forms are not linked to sensitive personal data. ";

    }

        text += NY_LINJE;

    return text;
};

Instilling.prototype.btnColor = function () {
    var value = ($.trim($("#instilling").val()));
    var utility = new Utility();
    utility.setColorOnButton("btn_instilling", value, "info");
};