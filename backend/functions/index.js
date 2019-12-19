const functions = require("firebase-functions");
const firebase = require("firebase");
const express = require("express");

const app = express();

const config = {
  apiKey: "AIzaSyDY1DV-aRcZJk87Z6mJV4HW_Mmbtmf3XHE",
  authDomain: "embbed-3903b.firebaseapp.com",
  databaseURL: "https://embbed-3903b.firebaseio.com",
  projectId: "embbed-3903b",
  storageBucket: "embbed-3903b.appspot.com",
  messagingSenderId: "452716558906",
  appId: "1:452716558906:web:1d38791db69950d67a1303"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

app.get("/test", (request, response) => {
  response.send("hello");
});

app.post("/person", (request, response) => {
  var d = new Date();
  var time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (request.body.status == "in") {
    db.collection("person").add({ status: "in", time });
    response.status(200).send(time);
  } else if (request.body.status == "out") {
    db.collection("person").add({ status: "out", time });
    response.status(200).send(time);
  } else {
    response.status(200).send("wrong status");
  }
});

exports.app = functions.https.onRequest(app);
