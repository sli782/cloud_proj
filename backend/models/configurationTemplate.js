var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ConfigurationTemplate = new schema({
    name: {type: String},
    ProcessorCores: {type: Number},
    VirtualRAM: {type: Number},
    Storage: {type: Number},
    Value: {type: Number}

},{
    collection: 'configurationtemplate' 
}
);
module.exports = mongoose.model('configurationtemplate', ConfigurationTemplate);