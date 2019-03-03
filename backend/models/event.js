var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Event = new schema({
    VM: {type: String},
    CC: {type: String},
    VMType: {type: String},
    EventType: {type: String},
    EventTimeStamp: {type: String}

},{
    collection: 'event' 
}
);
module.exports = mongoose.model('event', Event);