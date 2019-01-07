var mangoose = require('mongoose');

//Enigme Schema
var enigmeSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    id: String,
    titre : String,
    question : String,
    enonce : String,
    indices: Array,
    info: String,
    coordonnee : Array,
    img : String,
    reponse : String,
}, { collection: 'enigme' });

var Enigme = module.exports = mangoose.model('Enigme', enigmeSchema)

// Get Enigmes
module.exports.getEnigmes = function (callback, limit) {
    Enigme.find(callback).limit(limit)
}

// Get EnigmesId
module.exports.getEnigmeById = function (id,callback) {
    Enigme.findOne({id},callback)
}


// Add Enigme
module.exports.addEnigme = function (enigme, callback) {
    Enigme.create(enigme, callback)
}

// Update Enigme
module.exports.updateEnigme = function (id, enigme, options, callback) {
    var query = { _id: id }
    var update = {
        name: enigme.name
    }
    Enigme.findOneAndUpdate(query, update, options, callback)
}

// Delete Enigme
module.exports.removeEnigme = function (id, callback) {
    var query = { _id: id }
    Enigme.remove(query, callback)
}