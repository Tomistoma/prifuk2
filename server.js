//require('dotenv').config();
const rateLimit = require('express-rate-limit')
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');



mongoose.connect('mongodb+srv://spolekprifuk:NasSkvelySpolek@tomo.zkmfums.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', ()=> console.log("Connected to database"));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 2.5 * 60 * 1000, // 15 minutes
    max: 100,
    path: '/members/api/member' 
  });
  app.use(limiter);

const cors = require('cors');
const corsOptions ={
    origin:['http://localhost:3000',"dev-zbydz5ck.us.auth0.com", 'http://localhost:3001'], 
    credentials:true,
    accessControlAllowCredentials:true,
    optionSuccessStatus:200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsOptions));
const posts = require('./routes/posts');
app.use('/posts/', posts);
const members = require('./routes/members');
app.use('/members/', members);



app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/*
app.use(express.static('C:/Users/tomas/Coding/prifukDeploy/backend/build/build'));


app.get('/*', (req, res) => {
  res.sendFile('C:/Users/tomas/Coding/prifukDeploy/backend/build/index.html');
});
*/


app.listen(3001, () => {
console.log("Server is running")
});



