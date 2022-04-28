 const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    user: {   // event coordinator username
      type: String,
      required: true,
      trim: true,
    },
    name: {   // event name
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: Number,
      required: true,
      trim: true,
    },
    time_doors: {
      type: String,
      required: true,
      trim: true,
    },
    time_show: {
      type: String,
      required: true,
      trim: true,
    },
    age_rating: {
      type: String,
      required: true,
      trim: true,
    },
    tickets_total: {
      type: Number,
      required: true,
      trim: true,
    },
    tickets_available: {
      type: Number,
      required: true,
      trim: true,
    },
    tickets_price: {
      type: Number,
      required: true,
      trim: true,
    }
  },
  { collection: "events_list" }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;