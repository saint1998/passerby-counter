import React, { Component } from "react";

import firebase from "firebase";
import "firebase/database";

import "./App.css";

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

class App extends Component {
  state = {
    statuses: [],
    total: 0
  };
  render() {
    return (
      <div className="app">
        <div className="tableContent">
          <div className="total">
            <div className="header">Total</div>
            <div className="number">{this.state.total}</div>
          </div>
          <div className="status">
            <div className="header">
              <div style={{ borderRight: "1px solid #ffffff" }}>Status</div>
              <div>Timestamp</div>
            </div>
            <div className="statusContent">
              {this.state.statuses.map(status => {
                return (
                  <div className="statusItem">
                    <div>{status["status"]}</div>
                    <div>{status["time"]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setInterval(this.getData, 3000);
  }

  getData = () => {
    db.collection("person")
      .get()
      .then(snapShot => {
        let data = snapShot.docs.map(doc => doc.data());
        console.log(data);
        // data = data[0];
        let statuses = [];
        let enter = 0;
        let exit = 0;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (data[i]["status"] == "in") enter++;
          else if (data[i]["status"] == "out") exit++;
          statuses.push(data[i]);
        }
        let total = enter - exit;
        statuses.sort((a, b) => {
          if (a["time"] > b["time"]) return -1;
          if (a["time"] < b["time"]) return 1;
          return 0;
        });
        // console.log(data[0]);
        this.setState({ statuses, total });
      });
  };
}

export default App;
