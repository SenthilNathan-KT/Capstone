require("dotenv").config();

const cors = require('cors');
const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");
const flash = require('connect-flash');

const app = new express();
app.use(express.static("public"));
const port = 3001;

app.use(expressSession({secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true,
             store: mongoStore.create({ mongoUrl: process.env.MONGO_SESSION_URL }), 
             cookie: { maxAge: 3600000,} }) );

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(flash());

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

const homeController = require('./controllers/home.js');
const loginGetController = require('./controllers/loginGet.js');
const registerGetController = require('./controllers/registerGet.js');
const loginPostController = require('./controllers/loginPost.js');
const registerPostController = require('./controllers/registerPost.js');

const topicPostController = require('./controllers/topicPost.js');
const topicsGetController = require('./controllers/topicsGet.js');
const topicsUpdateController = require('./controllers/topicUpdate.js');
const topicsDeleteController = require('./controllers/topicDelete.js');
const topicGetWithIdController = require('./controllers/topicGetWithId.js');

const quizPostController = require('./controllers/quizPost.js');
const quizGetController = require('./controllers/quizGet.js');
const quizDeleteController = require('./controllers/quizDelete.js');

const authCheckMiddleware = require("./middleware/authCheck.js");
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());
app.get("/", homeController);

app.get("/auth/login", authCheckMiddleware, loginGetController);
app.post("/auth/login", loginPostController);

app.get("/auth/register", registerGetController);
app.post("/auth/register", registerPostController);

app.get("/topics", authCheckMiddleware, topicsGetController);
app.post("/topic", authCheckMiddleware, topicPostController);
app.put("/topics/:id", authCheckMiddleware, topicsUpdateController);
app.delete("/topics/:id", authCheckMiddleware, topicsDeleteController);
app.get("/topics/:topicId", authCheckMiddleware, topicGetWithIdController);


app.post("/topics/:topicId/quiz", authCheckMiddleware, quizPostController);
app.get("/topics/:topicId/quizzes/:quizId", authCheckMiddleware, quizGetController);
app.delete("/topics/:topicId/quizzes/:quizId", authCheckMiddleware, quizDeleteController);

// app.get('/',(req,res)=>{
//     res.json({name: 'Welcome to Express' })
// });

app.listen(port, () => {
  console.log(`Server running at the port ${port}`);
});