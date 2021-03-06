const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
    },
    buyer_name: {
        type: String,
        required: true,
        trim: true,
    },
    buyer_email: {
        type: String,
        required: true,
        trim: true,
    },
    order_number: {
        type: String,
        required: true,
        trim: true,
    },
});

const EventSchema = new mongoose.Schema(
    {
        coordinator: {
            type: String,
            required: true,
            trim: true,
        },
        event_name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        time_doors: {
            type: Date,
            required: false,
            trim: true,
        },
        time_show: {
            type: Date,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
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
        },
        tickets_sold: [TicketSchema],
    },
    { collection: "events_list" }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
