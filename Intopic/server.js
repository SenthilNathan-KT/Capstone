const cors = require('cors');
const http = require('http');
const express = require('express');
const path = require('path');
const app = new express();
app.use(express.static("public"));
const port = 3001;

const homeController = require('./controllers/home.js');
const loginGetController = require('./controllers/loginGet.js');
const registerGetController = require('./controllers/registerGet.js');
const loginPostController = require('./controllers/loginPost.js');
const registerPostController = require('./controllers/registerPost.js');
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());
app.get("/", homeController);

app.get("/login", loginGetController);
app.post("/login", loginPostController);

app.get("/register", registerGetController);
app.post("/register", registerPostController);

// app.get('/',(req,res)=>{
//     res.json({name: 'Welcome to Express' })
// });

app.listen(port, () => {
  console.log(`Server running at the port ${port}`);
});