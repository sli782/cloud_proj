var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Consumer = new schema({
    name: {type: String},
    password: {type: String},
    charge:{type: Number}
},{
    collection: 'consumer' 
}
);
module.exports = mongoose.model('consumer', Consumer);