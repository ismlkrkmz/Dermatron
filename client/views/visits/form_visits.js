Template.form_visits.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewVisit ) {
          $('#input_patientId option:selected').val(globalPatientIdForNewVisit);
          patientId = globalPatientIdForNewVisit;
          globalPatientIdForNewVisit = '';
        }
        if (patientId) {
            return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
        } else {
            return "";
        }
    },

    patientIdFixer: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewVisit ) {
            return globalPatientIdForNewVisit
        } else {
            return patientId
        }
    }

});

Template.form_visits.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50 // Creates a dropdown of 15 years to control year
    });

    $('.timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });

    if ($('.multiple-select option:selected').val() == "") {
        $('.multiple-select option:selected').prop('disabled', true);
    }

    $(document).ready(function() {
      $('select').material_select();
    });

    if (Router.current().params._id) {
        $('.datepicker').val(visits.findOne(Router.current().params._id).visitDate);
    }

    $('img.anatomic-map').maphilight();

    var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
    preload('/image-map/male-mesh/head.png', '/image-map/male-mesh/full-body-back.png', '/image-map/male-mesh/trunk.png', '/image-map/male-mesh/upper-limbs.png', '/image-map/male-mesh/anogenital-region.png', '/image-map/male-mesh/lower-limbs.png');

});

Template.form_visits.events ({

    // Horizontal FAB Buttons START

    'click a#anatomicalLocationBackside': function () {
        $('#input_anatomicalLocation').val('');
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/male-mesh/full-body-back.png" class="anatomic-map" usemap="#male-full-body">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
        $('div.fixed-action-btn').css('bottom', '50px');
    },

    'click a#anatomicalLocationReset': function () {
        $('#input_anatomicalLocation').val('');
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/male-mesh/full-body.png" class="anatomic-map" usemap="#male-full-body">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
        $('div.fixed-action-btn').css('bottom', '50px');
    },

    // Horizontal FAB Buttons END

    // Generic area click events START

    'click area.level1': function (event) {
        $('#input_anatomicalLocation').val(event.currentTarget.title);
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/male-mesh/' + event.currentTarget.id + '.png" class="anatomic-map" usemap="#male-' + event.currentTarget.id + '">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
    },

    'click area.level2': function (event) {
        $('#input_anatomicalLocation').val($('#input_anatomicalLocation').val() + ' > ' + event.currentTarget.title);
        $('div.anatomic-map').remove();
        $('div.fixed-action-btn').css('bottom', '0px');
    }

    // Generic area click events END

});
