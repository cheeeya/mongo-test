const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const mongoKey = require('./config.js').mongoKey;


let db;

MongoClient.connect(mongoKey, (err,client) => {
  if (err) return console.log(err);
  db = client.db("mongo_test");
  app.listen(9000, () => {
    console.log("listening on 9000");
  });
})

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/info", (req,res) => {
  db.collection("info").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  })
})
