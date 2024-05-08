const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const User = require("./models/config");
require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio credentials
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

// API route for sending Twilio message
app.post("/send-twilio-message", async (req, res) => {
  try {
    const { body, from, to, uid } = req.body;

    const findUser = await User.findOne({ user_id: uid });
    if (!findUser || !findUser.twilio_enabled) {
      return res.status(401).json({
        error: true,
        message: "Your Twilio is not enabled",
      });
    }

    const client = new twilio(accountSid, authToken);

    const message = await client.messages.create({ body, from, to });

    res.status(200).json({
      message: "Message sent successfully",
      messageId: message.sid,
    });
  } catch (error) {
    console.error("Error sending Twilio message:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

module.exports.handler = app;
