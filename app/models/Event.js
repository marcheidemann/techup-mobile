Ext.regModel(
    'techup.Event',
    {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'dateFrom', type: 'date', dateFormat: 'c'},
            {name: 'dateTo', type: 'date', dateFormat: 'c'},
            {name: 'location', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'canton', type: 'string'},
            {name: 'lat', type: 'float'},
            {name: 'lon', type: 'float'},
            {name: 'description', type: 'string'},
            {name: 'price', type: 'string'},
            {name: 'link', type: 'string'},
            {name: 'twitter_handle', type: 'string'},
            {name: 'attendees', type: 'auto'},
            {name: 'dateGroup', type: 'string'},
            {
                name: 'dateFromShort',
                convert: function(value, record) {
                    return record.get('dateFrom').format('d.m. Y, H:i');
                }
            },
            {
                name: 'dateToShort',
                convert: function(value, record) {
                    return record.get('dateTo').format('d.m. Y, H:i');
                }
            },
            {
                name: 'dateFromToLine1',
                convert: function(value, record) {
                    var dateFrom, dateTo, dateFromFormated, dateToFormated, hourFrom, hourTo;
                    dateFrom = record.get('dateFrom');
                    dateTo = record.get('dateTo');
                    dateFromFormated = dateFrom.format('d.m.Y');
                    dateToFormated = dateTo.format('d.m.Y');
                    hourFrom = dateFrom.format('H:i');
                    hourTo = dateTo.format('H:i');

                    if (dateToFormated === dateFromFormated) {
                        return dateFromFormated;
                    } else {
                        return dateFromFormated + ' ' + hourFrom;
                    }
                }
            },
            {
                name: 'dateFromToLine2',
                convert: function(value, record) {
                    var dateFrom, dateTo, dateFromFormated, dateToFormated, hourFrom, hourTo;
                    dateFrom = record.get('dateFrom');
                    dateTo = record.get('dateTo');
                    dateFromFormated = dateFrom.format('d.m.Y');
                    dateToFormated = dateTo.format('d.m.Y');
                    hourFrom = dateFrom.format('H:i');
                    hourTo = dateTo.format('H:i');

                    if (dateToFormated === dateFromFormated) {
                        return hourFrom + ' - ' + hourTo;
                    } else {
                        return dateToFormated + ' ' + hourTo;
                    }
                }
            }
        ]
    }
);

Ext.regModel("techup.Attendee", {
    fields: [
        {name: "fullname", type: "string"},
        {name: "twitter_handle", type: "string"}
    ]
});

var createEventListStore = function (name, controllerAction, url) {
    Ext.regStore(
        name,
        {
            model: 'techup.Event',
            proxy: {
                type: 'ajax',
                url: url,
                reader: {
                    type: 'json',
                    root: 'events'
                }
            },
            getGroupString: function (record) {
                return record.get('dateGroup');
            },
            controllerAction: controllerAction
        }
    );
}

createEventListStore('techup.upcomingEvents', 'upcomingList', 'http://techup.ch/api/events/upcoming.json');
createEventListStore('techup.pastEvents', 'pastList', 'http://techup.ch/api/events/past.json');
