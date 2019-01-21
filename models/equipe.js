var mangoose = require('mongoose')

// Equipe Schema

var equipeSchema = mangoose.Schema({
    score: Number,
    nom: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    enigmes:[
        {
            _idQuestion: String,
            check: Boolean,
            succeed: Boolean,
            gain:Number
        }
    ],
    participants: Array,
    telephone: String,
    date: {
        type: Date,
        defaul: Date.now
    },
    markers: Array
}, { collection: 'equipe' });

var Equipe = module.exports = mangoose.model('Equipe', equipeSchema)

// Get Equipe
module.exports.getEquipe = function (callback, limit) {
    Equipe.find(callback).limit(limit)
}

// Get EquipeId
module.exports.getEquipeById = function (id, callback) {
    Equipe.findOne({ id }, callback)
}

// Add Equipe
module.exports.addEquipe = function (equipe, callback) {
    Equipe.create(equipe, callback)
}

// Update Equipe
module.exports.updateEquipe = function (_id, update,callback) {
    Equipe.findByIdAndUpdate(_id, update,callback)       
}

// Update Equipe info
module.exports.updateInfoEquipe = function(_id, update, callback) {
    Equipe.findOneAndUpdate(_id, update, callback)
}

// Delete Equipe
module.exports.removeEquipe = function (id, callback) {
    var query = { _id: id }
    Equipe.remove(query, callback)
}

// Get rank
module.exports.getRank = function (rank, callback) {
    Equipe.aggregate(rank, callback)
}