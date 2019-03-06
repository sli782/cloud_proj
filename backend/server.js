const Express = require("express");
const BodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://smartshoppingcart:luoxi123@cluster0-p72u0.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "se4455_lab02";
const configTemplateModel = require('./models/configurationTemplate');
const eventModel = require('./models/event');
const consumerModel = require('./models/consumer');
const virtualMachineModel = require('./models/virtualmachine');
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
var database, ConsumerCollection, InstanceCollection, TemplateCollection, EventCollection ;
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
           console.log('Can not connect to the database' + error) 
        }
        database = client.db(DATABASE_NAME);
        ConsumerCollection = database.collection("VM_user");
        InstanceCollection = database.collection("VirtualServer_Instance"); 
        TemplateCollection =  database.collection("ConfigurationTemplate");
        EventCollection = database.collection("Event");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, function(){
    console.log('listening on port ' + port);
});
/*app.post("/instance", (request, response) => {
    ConsumerCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});*/
// var VirtualMachineMap = { 'Basic Virtual Server Instance': '5c7746fb1c9d44000074bacf', 'Large Virtual Server Instance':'5c77482a1c9d44000074bad0', 'Ultra-Large Virtual Server Instance': '5c7748981c9d44000074bad1' };

app.post("/instance", (request, response) => {
var promise = new Promise(function(res, rej){
    InstanceCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        res()
    });
})
promise.then(function(va){
    EventCollection.insertOne({
        VM: request.body['_id'],
        CC: request.body['user'],
        VMType: request.body['configurationTemplate'],
        EventType: "Create",
        EventTimeStamp: new Date()
    
    })
})
});




app.post("/instance/start/:id", (request, response) => {
    EventCollection.insertOne({
        VM: request.params.id,
        CC: result['ops'][0]['user'],
        VMType: result['ops'][0]['configurationTemplate'],
        EventType: "Start",
        EventTimeStamp: new Date()
    })
});

app.post("/instance/stop/:id", (request, response) => {
    EventCollection.insertOne({
        VM: request.params.id,
        CC: result['ops'][0]['user'],
        VMType: result['ops'][0]['configurationTemplate'],
        EventType: "Stop",
        EventTimeStamp: new Date()
    })
});


// app.get("/instance/upgrade/:id", (request, response) => {
//     InstanceCollection.findOneAndUpdate({ "_id": new ObjectId(request.params.id)},{$set: { name: request.name } }, (error, result) =>{
//         response.send(result);
//     })
// });
// Update Instance for the configuration template 
app.get("/instance/upgrade/:id", (request, response) => {
    var vmtype;
    InstanceCollection.findOne({ "_id": new ObjectId(request.params.id)}, (error, result) =>{
            if(result['configurationTemplate'] == "5c7746fb1c9d44000074bacf")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c77482a1c9d44000074bad0"}}
                ),
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Large",
                    EventType: "Upgrade",
                    EventTimeStamp: new Date()
                })
            }
            if(result['configurationTemplate'] == "5c77482a1c9d44000074bad0")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c7748981c9d44000074bad1"}}
                ),
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Ultra-large",
                    EventType: "Upgrade",
                    EventTimeStamp: new Date()
                })
            }
            if(result['configurationTemplate'] == "5c7748981c9d44000074bad1")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c7748981c9d44000074bad1"}}
                ),
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Ultra-large",
                    EventType: "Upgrade",
                    EventTimeStamp: new Date()
                })
            } 
        }
    )
});
app.get("/instance/downgrade/:id", (request, response) => {
    var vmtype;
    InstanceCollection.findOne({ "_id": new ObjectId(request.params.id)}, (error, result) =>{
            if(result['configurationTemplate'] == "5c7746fb1c9d44000074bacf")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c7746fb1c9d44000074bacf"}}
                ),
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Basic",
                    EventType: "Downgrade",
                    EventTimeStamp: new Date()
                })
            }
            if(result['configurationTemplate'] == "5c77482a1c9d44000074bad0")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c7746fb1c9d44000074bacf"}}
                ),
                TemplateCollection.findOne({"_id": result['configurationTemplate']}, (error, result) =>{
                    vmtype = result['name'];
                })
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Basic",
                    EventType: "Downgrade",
                    EventTimeStamp: new Date()
                })
            }
            if(result['configurationTemplate'] == "5c7748981c9d44000074bad1")
            {
                InstanceCollection.updateOne(
                    { "_id": new ObjectId(request.params.id)},
                    { $set: { "configurationTemplate" : "5c77482a1c9d44000074bad0"}}
                ),
                EventCollection.insertOne({
                    VM: request.params.id,
                    CC: "5c77466b1c9d44000074bace",
                    VMType: "Large",
                    EventType: "Downgrade",
                    EventTimeStamp: new Date()
                })
            } 
        }
    )
});
app.get("/instance/delete/:id", (request, response) => {
InstanceCollection.findOne({"_id": new ObjectId(request.params.id)}, (error,result) =>{
 var promise1 = new Promise(function(res, rej){
    createDeleteEvent(request.params.id, result['configurationTemplate']),
    res()
 })
 promise1.then(function(va){
    InstanceCollection.deleteOne({"_id": new ObjectId(request.params.id)}, (error, result) =>{
        if(error){
            console.log(error)
        }
    })
 })


})

})

function createDeleteEvent(id, name){
    EventCollection.insertOne({
        VM: id,
        CC: "5c77466b1c9d44000074bace",
        VMType: name,
        EventType: "Delete",
        EventTimeStamp: new Date()
    
    })

}
   



app.get("/consumer",(request,response) => {
    ConsumerCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
app.get("/instance",(request,response) => {
    InstanceCollection.find({}).toArray((error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
});
});


app.get("/consumer/:id", (request, response) => {
    GroceryCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});