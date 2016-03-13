var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(8080).sockets;
var anyg;    



mongo.connect('mongodb://127.0.0.1/chat', function (err, db) {
    if (err) throw err;
anyg = db;

})

client.on("connection", function (socket) {
    
    var col = anyg.collection('messages');
    console.log("someone has connected");
    socket.on('input', function (data) {
        var name = data.name,
            message = data.message;
            
        col.insert({name : name , message : message},function () {
            console.log("inserted");
        })    
    })
});    