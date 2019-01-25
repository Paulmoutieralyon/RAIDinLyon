var mangoose = require('mongoose');

//Session Schema
var sessionSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    nom:String,
    isactivate:Boolean,
    deadline:String,
    activetimer:Boolean,
    pointrencontre:Array,
}, { collection: 'session' });

var Session = module.exports = mangoose.model('Session', sessionSchema)

// Get Session
module.exports.getSession = function (callback, limit) {
    Session.find(callback).limit(limit)
}

// Update Session
module.exports.updateSession = function (id, update,callback) {
    Session.findOneAndUpdate(id, update,callback)
       
}
