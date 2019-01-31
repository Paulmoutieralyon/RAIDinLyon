var mangoose = require('mongoose');

//Enigme Schema
var enigmeSchema = mangoose.Schema({
    id: String,
    titre: String,
    question: String,
    enonce: String,
    indices: Array,
    info: String,
    coordonnee: Array,
    img: String,
    reponse: String,
    agagner: Number,
}, { collection: 'enigme' });

var Enigme = module.exports = mangoose.model('Enigme', enigmeSchema)

// Get Enigmes
module.exports.getEnigmes = function (callback, limit) {
    Enigme.find(callback).limit(limit)
}

// Get EnigmesId
module.exports.getEnigmeById = function (_id, callback) {
    Enigme.findOne({ _id }, callback)
}


// Add Enigme
module.exports.addEnigme = function (enigme, callback) {
    Enigme.create(enigme, callback)
}

// Update Enigme
module.exports.updateEnigme = function (_id, update,callback) {
    Enigme.findByIdAndUpdate(_id, update,callback)
       
}

// Delete Enigme
module.exports.removeEnigme = function (id, callback) {
    var query = { _id: id }
    Enigme.remove(query, callback)
}