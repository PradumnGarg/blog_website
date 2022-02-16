//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _=require('lodash');

const homeStartingContent = "This is the first site I have created from scratch Independently and so I want it to be special. I'll  be talking  about the courses I have been doing and the projects I'll be making and how you guys could reciprocate the same. So if you are interested to take a piece of the pie I expect you to bookmark this site for future reference . I have made certain mistakes in the past and so don't want people to reiterate the same.  The analogy Learn from your mistakes  here fits perfectly. Pleased to welcome you all on board with us on this journey😊 "
const app = express();
let posts=[];
mongoose.connect("mongodb+srv://pradumn-garg:Aarpga4050@cluster0.i1m3m.mongodb.net/blogDB");

const postschema={
  title :String,
  content: String
};

const Post=mongoose.model(
  "Post",postschema
)

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Post.find({}, function(err, posts){

    res.render("home", {
 
      HomeContent: homeStartingContent,
 
      postsList: posts
 
      });
 
  });
 
 

})


app.get("/about",function(req,res){
  res.render('about');
})

app.get("/contact",function(req,res){
  res.render('contact');
})

app.get("/compose",function(req,res){
  res.render('compose');
})


app.get("/posts/:postId",function(req,res){

const requestedPostId = req.params.postId;

Post.findOne({_id: requestedPostId}, function(err, post){

  res.render("post", {

    title: post.title,

    content: post.content

  });

});

});

app.post("/compose",function(req,res){

  const post = new Post ({

    title: req.body.titlecontent,
  
    content: req.body.postcontent
  
  });
  
  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
 
 
  


})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
