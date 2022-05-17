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

async function getEventById(id) {
    return await eventModel.findById(id);
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

async function validateCart(cart) {
    for (let event_id in cart) {
        let event;
        try {
            event = await getEventById(event_id);
        } catch (err) {
            if (err.message.indexOf("Cast to ObjectId failed") !== -1)
                throw new Error("Invalid event(s) specified.");
        }

        if (event === null) throw new Error("Invalid event(s) specified.");
        if (event.tickets_available < cart[event_id])
            throw new Error("Not enough tickets available.");
    }
}

async function addTicketsToEvent(event_id, quantity, name, email, orderId) {
    const event = await getEventById(event_id);
    let tickets = event.tickets_sold,
        available = event.tickets_available;

    for (let i = 0; i < quantity; i++) {
        let new_ticket = {
            buyer_name: name,
            buyer_email: email,
            order_number: orderId,
        };
        do {
            new_ticket.id = Math.floor(100000 + Math.random() * 900000);
        } while (tickets.some((e) => e.id === new_ticket.id));

        tickets.push(new_ticket);
    }

    result = await updateEventById(event_id, { tickets_sold: tickets });

    await updateEventById(event_id, {
        tickets_available: available - quantity,
    });
}

async function purchaseTickets(orderDetails) {
    let cart = orderDetails.cart;
    await validateCart(cart);

    let orderId = Date.now() + "" + Math.floor(Math.random() * 1000);

    for (let eventId in cart) {
        addTicketsToEvent(
            eventId,
            cart[eventId],
            orderDetails.name,
            orderDetails.email,
            orderId
        );
    }

    console.log("TICKETS PURCHASED - OID: " + orderId);

    return orderId;
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
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.deleteEventById = deleteEventById;
exports.updateEventById = updateEventById;
exports.purchaseTickets = purchaseTickets;
exports.getUser = getUser;
