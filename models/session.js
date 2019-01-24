var mangoose = require('mongoose');

//Session Schema
var sessionSchema = mangoose.Schema({
    _id: mangoose.Schema.Types.ObjectId,
    nom:String,
    isactivate:Boolean,
    deadline:String
}, { collection: 'session' });

var Session = module.exports = mangoose.model('Session', sessionSchema)

// Get Session
module.exports.getSession = function (callback, limit) {
    Session.find(callback).limit(limit)
}

// Update Session
module.exports.updateSession = function (_id, update,callback) {
    Session.findOneAndUpdate(_id, update,callback)
       
}
