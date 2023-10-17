require("dotenv").config();
const http = require("http");
const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const { spacemanLogic } = require("./helper/spacemanLogic");
const { penaltyLogic } = require("./helper/penalty");
const { minesLogic } = require("./helper/mines");
var app = express();
app.use(express.json());
const server = http.createServer(app);
const PORT = 8080;

// var serviceAccount = require('./key/test-key.json');
var serviceAccount = require("./key/firebase-credentials.json");
const { blazeDouble } = require("./helper/blaze_double");
const { blazeCrash } = require("./helper/blaze_crash");
const { dragonTigerLogic } = require("./helper/dragonTiger");
const { tigerLogic } = require("./helper/fortune-tiger");
const { rabbitLogic } = require("./helper/fortune-rabbit");
const { roletaBrasileira } = require("./helper/roleta_brasileira");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a Firestore instance
const db = admin.firestore();

// configuring the bot via Telegram API to use our route below as webhook
const setupWebhook = async (botToken, webhookURL) => {
  try {
    const { data } = await axios.get(
      `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookURL}&drop_pending_updates=true`
    );
    return data;
  } catch (error) {
    return error;
  }
};

// setup our webhook url route
app.post("/webhook", (req, res) => {
  console.log(req.body);
  const botToken = req.body.botToken;
  const webhookURL = req.body.webhookURL;
  const botRoute = req.body.botRoute;
  setupWebhook(botToken, webhookURL);
  /* 
      we need to respond back with 200 to let telegram know that we 
      have received the update. Failing to do so will result in telegram 
      not sending further updates after the first one.
    */
  res.status(200).send("ok");
});

app.post("/spaceman", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  const results = await spacemanLogic(data);
  if (data && results !== false) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("spaceman")
      .doc(`spaceman-id-${id}`)
      .set({
        type: results.type,
        enter: results.enter,
        exit: results.exit,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(200).send("Successful type 2");
  }
});

app.post("/mines", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  const results = minesLogic(data);
  if (data) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("mines")
      .doc(`mines-id-${id}`)
      .set({
        attempts: results.attempts,
        mines: results.mines,
        result: results.result,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(404).send("Error");
  }
});

app.post("/fortune-tiger", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(data);
  const results = tigerLogic(data);
  if (data) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("fortune-tiger")
      .doc(`tiger-id-${id}`)
      .set({
        jogadas: results.jogadas,
        limit: results.limit,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(404).send("Error");
  }
});

app.post("/fortune-rabbit", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(data);
  const results = rabbitLogic(data);
  if (data) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("fortune-rabbit")
      .doc(`rabbit-id-${id}`)
      .set({
        jogadas: results.jogadas,
        limit: results.limit,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(404).send("Error");
  }
});

app.post("/blaze-double", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(data);
  const results = blazeDouble(data);
  if (data && results !== false) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("blaze-double")
      .doc(`double-id-${id}`)
      .set({
        gales: results.gales,
        enter: results.enter,
        protect: results.protect,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });
    res.status(200).send(results);
  } else {
    res.status(200).send("Non saved on database");
  }
});

app.post("/blaze-crash", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(data);
  const results = blazeCrash(data);
  if (data && results !== false) {
    const id = new Date().getTime();

    // Write data to Firestore

    db.collection("blaze-crash")
      .doc(`crash-id-${id}`)
      .set({
        gales: results.gales,
        enter: results.enter,
        exit: results.exit,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(200).send("Non saved on database");
  }
});

app.post("/dragontiger", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(req.body);
  const results = dragonTigerLogic(data);
  if (data && results !== false) {
    const id = new Date().getTime();
    // Write data to Firestore
    db.collection("dragontiger")
      .doc(`dragontiger-id-${id}`)
      .set({
        result: results.result,
        strategy: results.strategy,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
        console.log({
          result: results.result,
          strategy: results.strategy,
          timestamp: new Date(),
        });
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });
    res.status(200).send(results);
  } else {
    res.status(200).send("Non saved on database");
  }
});

app.post("/penalty", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(req.body);
  const results = penaltyLogic(data);
  if (data && results !== false) {
    const id = new Date().getTime();
    // Write data to Firestore

    db.collection("penalty")
      .doc(`penalty-id-${id}`)
      .set({
        result: results.result,
        exit: results.exit,
        strategy: results.strategy,
        attempt: results.attempt,
        validity: results.validity,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
        console.log({
          result: results.result,
          strategy: results.strategy,
          attempt: results.attempt,
          validity: results.validity,
          timestamp: new Date(),
        });
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(200).send("Non saved on database");
  }
});

app.post("/roleta-brasileira", async (req, res) => {
  // Send the message to all connected WebSocket clients
  const data = req.body?.channel_post?.text;
  console.log(req.body);
  const results = roletaBrasileira(data);
  console.log(results);
  if (data && results !== false) {
    const id = new Date().getTime();
    // Write data to Firestore

    db.collection("roleta-brasileira")
      .doc(`roleta-id-${id}`)
      .set({
        enter_columns: results.enter_columns,
        last_number: results.last_number,
        protect: results.protect,
        cover: results.cover,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Data written to Firestore!");
        console.log({
          enter_columns: results.enter_columns,
          last_number: results.last_number,
          protect: results.protect,
          cover: results.cover,
          timestamp: new Date(),
        });
      })
      .catch((error) => {
        console.error("Error writing to Firestore: ", error);
      });

    res.status(200).send(results);
  } else {
    res.status(200).send("Non saved on database");
  }
});

server.listen(PORT, async () => {
  // setting up our webhook url on wss spinup
  try {
    console.log(`Server is up and Running at PORT : ${PORT}`);
    await setupWebhook();
  } catch (error) {
    console.log(error.message);
  }
});
