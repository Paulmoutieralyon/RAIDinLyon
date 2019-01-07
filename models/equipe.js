var mangoose = require('mongoose')

// Equipe Schema

var equipeSchema = mangoose.Schema({
    score: Number,
    nom: String,
    email: String,
    token : String,
    participants: Array,
    telephone : String,
    h_fin : Number,
}, {collection: 'equipe' });

var Equipe = module.exports = mangoose.model ('Equipe', equipeSchema)

// Get Equipe
module.exports.getEquipe = function (callback, limit) {
    Equipe.find(callback).limit(limit)
}

// Get EquipeId
module.exports.getEquipeById = function (id,callback) {
    Equipe.findOne({id},callback)
}


// Add Equipe
module.exports.addEquipe = function (equipe, callback) {
    Equipe.create(equipe, callback)
}

// Update Equipe
module.exports.updateEquipe = function (id, equipe, options, callback) {
    var query = { _id: id }
    var update = {
        name: equipe.name
    }
    Equipe.findOneAndUpdate(query, update, options, callback)
}

// Delete Equipe
module.exports.removeEquipe = function (id, callback) {
    var query = { _id: id }
    Equipe.remove(query, callback)
}