const mongoose = require("mongoose");
const eventModel = require("./events");
const userModel = require("./users");
mongoose.set("debug", true);
const dotenv = require("dotenv");

dotenv.config();

mongoose
    .connect(
        "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PWD +
            "@" +
            process.env.MONGO_CLUSTER +
            "/" +
            process.env.MONGO_DB +
            "?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch((error) => console.log(error));

async function getEvents(userID) {
    if (userID) return await eventModel.find({ coordinator: userID });
    else return await eventModel.find();
}

async function addEvent(event) {
    try {
        const eventToAdd = new eventModel(event);
        const savedEvent = await eventToAdd.save();
        return savedEvent;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteEventById(id) {
    return await eventModel.findByIdAndDelete(id);
}

async function updateEventById(id, data) {
    return await eventModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
}

async function addTickets(event_id, num_tickets, ticket) {
    const event = await eventModel.findById(event_id);
    let tickets = event.tickets_sold,
        available = event.tickets_available;

    if (num_tickets > available) {
        throw new Error("Not enough tickets available.");
    }

    ticket.order_number = Date.now() + "" + Math.floor(Math.random() * 1000);
    console.log(typeof ticket.order_number);

    for (let i = 0; i < num_tickets; i++) {
        let new_ticket = Object.assign({}, ticket);
        do {
            new_ticket.id = Math.floor(100000 + Math.random() * 900000);
        } while (tickets.some((e) => e.id === new_ticket.id));

        tickets.push(new_ticket);
    }

    result = await updateEventById(event_id, { tickets_sold: tickets });

    if (result === undefined) throw new Error("Error adding tickets.");

    await updateEventById(event_id, {
        tickets_available: available - num_tickets,
    });

    console.log("TICKETS PURCHASED - OID: " + ticket.order_number);
    return (filtered = tickets.filter(
        (t) => t.order_number === ticket.order_number
    ));
}

async function getUser(user) {
    result = await userModel.find({ username: user });
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

exports.getEvents = getEvents;
exports.addEvent = addEvent;
exports.deleteEventById = deleteEventById;
exports.updateEventById = updateEventById;
exports.addTickets = addTickets;
exports.getUser = getUser;
