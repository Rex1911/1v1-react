const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const Question = require("./models/questionsModel");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const shrinkRay = require('shrink-ray-current');

require('dotenv').config()
//========================
// MongoDB setup
//========================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/dotpy", { useNewUrlParser: true, useUnifiedTopology: true});
// seedDB();

//=======================
// Middleware
//=======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(shrinkRay());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.urlencoded({ extended: false }))

//======================
//     ROUTES
//======================

app.use('/api/', apiRoutes)

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//=======================
// STARTING THE SERVER
//=======================

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, function(){
  console.log('Server started on port: ' + PORT);
});

//========================
// SOCKET IO STUFF
//========================

var socket = require("socket.io")
var io = socket().listen(server);

io.on('connection', function(socket){
    console.log("Client joined")
    socket.on("joinContest", (id) => {
        socket.join(id);
    });

    socket.on("startContest", (data) => {
        //Search the DB for the question using the _id provided by the frontend
        Question.find({_id:data.questionID}, (err,question)=> {
            if(err) {
                console.log(err);
            } else {
                io.to(data.roomID).emit("start", {question:question,totalTime:data.totalTime});
            }
        });
    });

    socket.on("gameOver", (roomID) => {
        socket.broadcast.to(roomID).emit("lost");
    });

    socket.on('error', function(e){
    	console.log(e);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
});
