const Express = require("express");
const BodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://smartshoppingcart:luoxi123@cluster0-p72u0.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "se4455_lab02";
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
var database, ConsumerCollection, InstanceCollection, TemplateCollection ;
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
           console.log('Can not connect to the database' + error) 
        }
        database = client.db(DATABASE_NAME);
        ConsumerCollection = database.collection("VM_user");
        InstanceCollection = database.collection("VirtualServer_Instance"); 
        TemplateCollection =  database.collection("ConfigurationTemplate");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, function(){
    console.log('listening on port ' + port);
});
// app.post("/grocery", (request, response) => {
//     GroceryCollection.insert(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });
app.get("/consumer",(request,response) => {
    ConsumerCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
// app.get("/consumer/:id", (request, response) => {
//     GroceryCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });