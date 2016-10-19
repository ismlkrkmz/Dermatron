Template.new_visits.helpers ({

    // controllers
    //visits: function() {
        //
    //}

});

Template.new_visits.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_visits = {
            patientId: tpl.find('#input_patientId').value,
            visitDate: tpl.find('#input_visitDate').value,
            visitTime: tpl.find('#input_visitTime').value,
            lesion: $('#input_lesion').val(),
            symptoms: $('#input_symptoms').val(),
            pathophysiology: $('#input_pathophysiology').val(),
            anatomicalLocation: tpl.find('#input_anatomicalLocation').value,
            image: $('img#capturedImage').attr('src'),
            diagnosis: $('#input_diagnosis').val(),
            prescription: $('#input_prescription').val(),
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_visits', new_visits);
        Router.go('visits');

    }

});
