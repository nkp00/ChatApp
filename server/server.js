const express = require('express');
const bodyParser = require('body-parser');
const routeObject = require('./routes/routes');
const mongoose = require('mongoose');
const validation = require('express-validator');
var socket = require('socket.io')
const Message = require('./app/models/chatModel')

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
//app.use(express.static(__dirname + "../client"));
app.use(validation());
//app.use(express.static(__dirname + '../client'));
app.use(express.static('../client'));

// Configuring the database
const dbConfig = require('../config/database.config');

// Connecting to the database
mongoose.connect('mongodb://localhost/data', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})
app.use('/', routeObject);

var server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});
var io = socket(server);
io.on('connection', function (socket) {
    console.log("made connection with socket", socket.id);

    socket.on('message', function (data) {
        let search = { $or: [{ sender: data.message.sender, receiver: data.message.receiver }, { receiver: data.message.sender, sender: data.message.receiver }] }
        Message.find(search)
            .then(result => {
                if (data.message.chatHistory) {
                    if (result.length < 1) {
                        var text = new Message({
                            sender: data.message.sender,
                            receiver: data.message.receiver,
                            chatHistory: [{ message: data.message.chatHistory }]
                        })
                        text.save().then(response => {
                        })
                            .catch(error => {
                                console.log(error);
                            })
                        io.sockets.emit('message', text)
                        console.log(text)
                    }
                    else {
                        let temp = result[0]
                        temp.chatHistory.push({ message: data.message.chatHistory })
                        Message.findOneAndUpdate(search, { $set: { chatHistory: temp.chatHistory } }).then(response => console.log("saved"))

                        console.log(temp)
                        io.sockets.emit('message', temp)
                    }
                }
                else {
                    if (result.length == 0) {

                        var text = new Message({
                            sender: data.message.sender,
                            receiver: data.message.receiver,
                            chatHistory: [{ message: "No conversation, say  Hi to start a conversation" }]
                        })
                        text.save().then(response => {
                        })
                            .catch(error => {
                                console.log(error);
                            })
                        io.sockets.emit('message', text)
                        console.log(text)

                    }
                    else {
                        //console.log(result)
                        let temp = result[0]
                        io.sockets.emit('message', temp)
                    }
                }

            })

    })
    //console.log(data)
})