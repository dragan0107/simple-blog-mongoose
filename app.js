//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 1717;
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://drip-admin:drip-test@cluster0.jr1bn.mongodb.net/postsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const homeStartingContent = "Hello there! Welcome to my Blog project that uses MongoDB and Mongoose to save all the data you enter. Go to New Post page to add more content 😀";
const aboutContent = "This Blog version is an upgrade from a more simple app that has its own DataBase and stores all the posts content in it.";
const contactContent = "contact email: gacee016@live.com";

const app = express();

const year = new Date().getFullYear();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//DEFINING POST SCHEMA AND POST COLLECTION
const postSchema = {
    title: String,
    text: String
};

const Post = mongoose.model('Post', postSchema);



app.get("/", function(req, res) {


    Post.find({}, function(err, results) {
        res.render("home", {
            htmlPar: homeStartingContent,
            htmlPosts: results,
            htmlYear: year
        });
    });
});




app.get("/about", function(req, res) {
    res.render("about", {
        htmlAbout: aboutContent,
        htmlYear: year
    });
});


app.get("/contact", function(req, res) {
    res.render("contact", {
        htmlContact: contactContent,
        htmlYear: year
    });
});

app.get("/compose", function(req, res) {
    res.render("compose", {
        htmlYear: year
    });
});

app.post("/compose", function(req, res) {

    const post = new Post({
        title: req.body.title,
        text: req.body.text
    });

    post.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    });


});




app.get("/posts/:postID", function(req, res) {

    const requestedID = req.params.postID;


    Post.findOne({ _id: requestedID }, function(err, results) {

        if (!err) {
            res.render("post", {
                hTitle: results.title,
                hText: results.text,
                htmlYear: year
            });

        }

    });


});






app.listen(port, function() {
    console.log("Server started on port 1717");
});