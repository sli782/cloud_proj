var mongoose = require('mongoose');
var schema = mongoose.Schema;
var VirtualMachine = new schema({
    name: {type: String},
    configurationTemplate: {type: mongoose.Schema.ObjectId, ref: 'configurationtemplate'}
},{
    collection: 'virtualmachine' 
}
);
module.exports = mongoose.model('virtualmachine', VirtualMachine);