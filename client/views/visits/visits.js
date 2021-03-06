var _deps = new Tracker.Dependency;
var options = {limit: 10, sort: { createdAt: -1} };

Template.visits.helpers ({

    // controllers
    tpl_info: function() {
        return visits.find().count() + translations.recordsFound[selectedLanguage];
    },

    visits: function() {
        _deps.depend();
        return visits.find({}, options).fetch();
    },

    invokeBeforeLoadVisits: function () {
        searchTextVisits.set('');
    },

    patientLookup: function(patientId) {
        return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
    },

    status: function(_id) {
        visit = visits.findOne(_id);
        var time = visit.visitDateTime.split(/ /)[1].split(/:/);
        var date = visit.visitDateTime.split(/ /)[0].split(/-/);
        var d = new Date(date[0], date[1]-1, date[2], time[0], time[1], 0, 0);
        var start = d;
        d.setMinutes(d.getMinutes() + 5);
        var end = d;
        var now = new Date();
        if (start > now) {
            return translations.future[selectedLanguage];
        } else if (end < now) {
            return translations.past[selectedLanguage];
        } else {
            return translations.now[selectedLanguage];
        }
    }

});

Template.visits.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_visits', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        searchTextVisits.set($('#filter_field').val());
        $('#loadMore').text(translations.loadMore[selectedLanguage]);
        $('#loadMore').fadeIn();
    },

    'click #checkAll': function (evt, tpl) {
        $('.checkthis').prop('checked', evt.target.checked);
    },

    'click #deleteAll': function () {
        // get the id of the checked rows
        $('input:checkbox:checked').filter(function(){
            var selectedIds = $(this).closest('tr').attr('id');
            if (selectedIds !== undefined) {
                Meteor.call('delete_selected_visits', selectedIds);
            }
        });
    },

    'click #loadMore': function () {
        options['limit'] += 10;
        _deps.changed();
        if (options['limit'] >= visits.find().count()){
            $('#loadMore').text(translations["Done"][selectedLanguage]);
            $('#loadMore').fadeOut();
        }

    },

    'click #loadReset': function () {
        options['limit'] = 10;
        _deps.changed();
        $('#filter_field').val('');
        searchTextVisits.set('');
        $('#loadMore').text(translations.loadMore[selectedLanguage]);
        $('#loadMore').fadeIn();
    },

    'click th': function () {
        if ($('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▲' || $('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▼') {
            $('#header-createdAt').text($('#header-createdAt').text().slice(0,-1));
        }
        if ($('#header-patientId').text()[$('#header-patientId').text().length - 1] == '▲' || $('#header-patientId').text()[$('#header-patientId').text().length - 1] == '▼') {
            $('#header-patientId').text($('#header-patientId').text().slice(0,-1));
        }
        if ($('#header-visitDateTime').text()[$('#header-visitDateTime').text().length - 1] == '▲' || $('#header-visitDateTime').text()[$('#header-visitDateTime').text().length - 1] == '▼') {
            $('#header-visitDateTime').text($('#header-visitDateTime').text().slice(0,-1));
        }
        if ($('#header-lesion').text()[$('#header-lesion').text().length - 1] == '▲' || $('#header-lesion').text()[$('#header-lesion').text().length - 1] == '▼') {
            $('#header-lesion').text($('#header-lesion').text().slice(0,-1));
        }
        if ($('#header-symptoms').text()[$('#header-symptoms').text().length - 1] == '▲' || $('#header-symptoms').text()[$('#header-symptoms').text().length - 1] == '▼') {
            $('#header-symptoms').text($('#header-symptoms').text().slice(0,-1));
        }
        if ($('#header-pathophysiology').text()[$('#header-pathophysiology').text().length - 1] == '▲' || $('#header-pathophysiology').text()[$('#header-pathophysiology').text().length - 1] == '▼') {
            $('#header-pathophysiology').text($('#header-pathophysiology').text().slice(0,-1));
        }
        if ($('#header-anatomicalLocation').text()[$('#header-anatomicalLocation').text().length - 1] == '▲' || $('#header-anatomicalLocation').text()[$('#header-anatomicalLocation').text().length - 1] == '▼') {
            $('#header-anatomicalLocation').text($('#header-anatomicalLocation').text().slice(0,-1));
        }
        if ($('#header-diagnosis').text()[$('#header-diagnosis').text().length - 1] == '▲' || $('#header-diagnosis').text()[$('#header-diagnosis').text().length - 1] == '▼') {
            $('#header-diagnosis').text($('#header-diagnosis').text().slice(0,-1));
        }
        if ($('#header-status').text()[$('#header-status').text().length - 1] == '▲' || $('#header-status').text()[$('#header-status').text().length - 1] == '▼') {
            $('#header-status').text($('#header-status').text().slice(0,-1));
        }
  },

    'click #header-createdAt': function () {
        if (options['sort']['createdAt'] == -1) {
            $('#header-createdAt').text('createdAt▲');
            options['sort'] = { createdAt: 1};
            _deps.changed();
        } else {
            $('#header-createdAt').text('createdAt▼');
            options['sort'] = { createdAt: -1};
            _deps.changed();
        }
    },

    'click #header-patientId': function () {
        if (options['sort']['patientId'] == -1) {
            $('#header-patientId').text('patientId▲');
            options['sort'] = { patientId: 1};
            _deps.changed();
        } else {
            $('#header-patientId').text('patientId▼');
            options['sort'] = { patientId: -1};
            _deps.changed();
        }
    },

    'click #header-visitDateTime': function () {
        if (options['sort']['visitDateTime'] == -1) {
            $('#header-visitDateTime').text('visitDateTime▲');
            options['sort'] = { visitDateTime: 1};
            _deps.changed();
        } else {
            $('#header-visitDateTime').text('visitDateTime▼');
            options['sort'] = { visitDateTime: -1};
            _deps.changed();
        }
    },

    'click #header-lesion': function () {
        if (options['sort']['lesion'] == -1) {
            $('#header-lesion').text('lesion▲');
            options['sort'] = { lesion: 1};
            _deps.changed();
        } else {
            $('#header-lesion').text('lesion▼');
            options['sort'] = { lesion: -1};
            _deps.changed();
        }
    },

    'click #header-symptoms': function () {
        if (options['sort']['symptoms'] == -1) {
            $('#header-symptoms').text('symptoms▲');
            options['sort'] = { symptoms: 1};
            _deps.changed();
        } else {
            $('#header-symptoms').text('symptoms▼');
            options['sort'] = { symptoms: -1};
            _deps.changed();
        }
    },

    'click #header-pathophysiology': function () {
        if (options['sort']['pathophysiology'] == -1) {
            $('#header-pathophysiology').text('pathophysiology▲');
            options['sort'] = { pathophysiology: 1};
            _deps.changed();
        } else {
            $('#header-pathophysiology').text('pathophysiology▼');
            options['sort'] = { pathophysiology: -1};
            _deps.changed();
        }
    },

    'click #header-anatomicalLocation': function () {
        if (options['sort']['anatomicalLocation'] == -1) {
            $('#header-anatomicalLocation').text('anatomicalLocation▲');
            options['sort'] = { anatomicalLocation: 1};
            _deps.changed();
        } else {
            $('#header-anatomicalLocation').text('anatomicalLocation▼');
            options['sort'] = { anatomicalLocation: -1};
            _deps.changed();
        }
    },

    'click #header-diagnosis': function () {
        if (options['sort']['diagnosis'] == -1) {
            $('#header-diagnosis').text('diagnosis▲');
            options['sort'] = { diagnosis: 1};
            _deps.changed();
        } else {
            $('#header-diagnosis').text('diagnosis▼');
            options['sort'] = { diagnosis: -1};
            _deps.changed();
        }
    },

    'click #header-status': function () {
        if (options['sort']['status'] == -1) {
            $('#header-status').text('status▲');
            options['sort'] = { status: 1};
            _deps.changed();
        } else {
            $('#header-status').text('status▼');
            options['sort'] = { status: -1};
            _deps.changed();
        }
    },

});
