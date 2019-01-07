const mangoose = require('mongoose')

//Administrateurs Schema
const administrateurSchema = mangoose.Schema({
    email: String,
    mdp: String
}, { collection: 'administrateur' });

const Administrateur = module.exports = mangoose.model('Administrateur', administrateurSchema)

// Get Administrateurs
module.exports.getAdministrateurs = function (callback, limit) {
    Administrateur.find(callback).limit(limit)
}

// Add Administrateur
module.exports.addAdministrateur = function (administrateur, callback) {
    Administrateur.create(administrateur, callback)
}

// Delete Administrateur
module.exports.removeAdministrateur = function (id, callback) {
    var query = { _id: id }
    Administrateur.remove(query, callback)
}