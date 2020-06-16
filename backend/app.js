const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const postsRoutes = require("./routes/posts");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://christian:VILSJ6zCeTyK5ot2@cluster0-pmimw.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() =>{
  console.log("Connected to the database!");
})
.catch(()=> {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use(cors({origin:true,credentials: true}));
app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Request-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
