var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(8080).sockets;
var anyg;    
mongo.connect('mongodb://chatapp:chatapp123@ds021299.mlab.com:21299/chatapp', function (err, db) {
    if (err) throw err;
anyg = db;

})

client.on("connection", function (socket) {
    
    var col = anyg.collection('messages');
    
    col.find().limit(100).sort({_id:1}).toArray(function (err,res) {
        if(err) throw err;
        socket.emit('output',res);
    })       
    
    console.log("someone has connected");
    socket.on('input', function (data) {
        var name = data.name,
            message = data.message;
            
        col.insert({name : name , message : message},function () {
            console.log("inserted");
        })    
        client.emit('output',[data]);
    })
});    
