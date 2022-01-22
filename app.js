//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// variables globales
const posts = [];

app.get("/", function(request, response){
  response.render("home", {homeContent: homeStartingContent, postsList : posts});
});

app.get("/about", function(request, response){
  response.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(request, response){
  response.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(request, response){
  response.render("compose");
});

app.post("/compose", function(request, response){
  let titlePost = request.body.titlePost;
  let textPost = request.body.textPost;

  var post = {
    title : titlePost,
    text: textPost
  }
  //taskList.push(nuevaTarea);
  posts.push(post);

  response.redirect("/");
});

app.get("/posts/:postId", function(request, response){

  var postId = _.lowerCase(request.params.postId);

  var title = "No encontrado";
  var text = "No encontrado";

  if (posts.length > 0){
    var result  = posts.filter(function(p){return _.lowerCase(p.title) == postId;} );
    if (result != null){
      title = result[0].title;
      text = result[0].text;
    }
  }

  response.render("post", {title: title, text: text});
});









app.listen(8081, function() {
  console.log("Server started on port 8080");
});
