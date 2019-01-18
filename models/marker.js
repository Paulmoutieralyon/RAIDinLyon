var mangoose = require('mongoose')

//Marker Schema
var markerSchema = mangoose.Schema({
create_table: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'marker' });

var Marker = module.exports = mangoose.model('Marker', markerSchema)

// Get Markers
module.exports.getMarkers = function (callback, limit) {
    Marker.find(callback).limit(limit)
}

// Add Marker
module.exports.addMarker = function (marker, callback) {
    Marker.create(marker, callback)
}

// Update Marker
module.exports.updateMarker = function (id, marker, options, callback) {
    var query = { _id: id }
    var update = {
        name: marker.name
    }
    Marker.findOneAndUpdate(query, update, options, callback)
}

// Delete Marker
module.exports.removeMarker = function (id, callback) {
    var query = { _id: id }
    Marker.marker(query, callback)
}