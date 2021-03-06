Template.new_patients.helpers ({

    // controllers
    //patients: function() {
        //
    //}

});

Template.new_patients.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_patients = {
            name: tpl.find('#input_name').value,
            surname: tpl.find('#input_surname').value,
            gender: tpl.find('#input_gender').value,
            birthDate: tpl.find('#input_birthDate').value,
            nationalId: tpl.find('#input_nationalId').value,
            socialSecurityType: tpl.find('#input_socialSecurityType').value,
            socialSecurityNumber: tpl.find('#input_socialSecurityNumber').value,
            isPatientDisabled: $('#input_isPatientDisabled').prop('checked') ? 'Yes' : 'No',
            bloodType: tpl.find('#input_bloodType').value,
            email: tpl.find('#input_email').value,
            phone: tpl.find('#input_phone').value,
            address: tpl.find('#input_address').value,
            dermatologicHistory: tpl.find('#input_dermatologicHistory').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_patients', new_patients);
        Router.go('patients');

    }

});
