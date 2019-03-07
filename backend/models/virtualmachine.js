var mongoose = require('mongoose');
var schema = mongoose.Schema;
var VirtualMachine = new schema({
    name: {type: String},
    /*configurationTemplate: {type: mongoose.Schema.ObjectId, ref: 'configurationtemplate'}*/
    configurationTemplate: {type:String},
    lastEvent: {type: String},
    lastTimeStamp: {type: Date, defualt: Date.now},
    currentEvent: {type: String},
    currentTimeStamp: {type: Date, default: Date.now},
    start: {type: Boolean},
    stop: {type: Boolean}
},{
    collection: 'virtualmachine' 
}
);
module.exports = mongoose.model('virtualmachine', VirtualMachine);