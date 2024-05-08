const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  business_id: {
    type: String,
  },
  store_id: {
    type: String,
  },
  twilio_enabled: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", configSchema);
