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

const port = process.env.PORT || 8081;
const server = app.listen(port, function(){
    console.log('listening on port ' + port);
});

// Start VM
app.post("/instance/start/:id", (request, response) => {
    console.log("Virtual machine: [" + request.params.id + "] starts at " + Date() + "...");
});

// Stop VM
app.post("/instance/stop/:id", (request, response) => {
    console.log("Virtual machine: [" + request.params.id + "] stops at " + Date() + "...");
});

app.get("/instance/upgrade/:id", (request, response) => {
    console.log("Virtual machine: [" + request.params.id + "] is requesting to upgrade...");
});

app.get("/instance/downgrade/:id", (request, response) => {
    console.log("Virtual machine: [" + request.params.id + "] is requesting to downgrade...");
});

app.get("/instance/delete/:id", (request, response) => {
    console.log("Virtual machine: [" + request.params.id + "] is has been deleted...");
})

