var mongoose = require('mongoose');
var schema = mongoose.Schema;
var VirtualMachine = new schema({
    name: {type: String},
    configurationTemplate: {type: mongoose.Schema.ObjectId, ref: 'ConfigurationTemplate'}
},{
    collection: 'virtualmachine' 
}
);
module.exports = mongoose.model('virtualmachine', VirtualMachine);