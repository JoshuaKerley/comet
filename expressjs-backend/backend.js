const express = require("express");
const cors = require("cors");
const eventServices = require("./models/event-services");
const userServices = require("./models/user-services");
const emailService = require("./email-services");
const app = express();
const port = 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//GETS ALL EVENTS (SHOULD NOT BE NEEDED ON FRONTEND)
app.get("/events", async (req, res) => {
    let result = await eventServices.getEvents();
    res.send(result).end();
});

//GETS EVENTS CREATED BY SPECIFIC USER (EVENT COORDINATOR)
app.get("/events/user/:user", async (req, res) => {
    const user = req.params["user"]; //or req.params.id
    let result = await eventServices.getEvents(user);
    res.send(result).end();
});

app.get("/events/id/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = await eventServices.getEventById(id);
    res.send(result).end();
});

app.delete("/events/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = await eventServices.deleteEventById(id);
    if (result === undefined) res.status(404).send("Event not found.");
    else {
        res.status(204).end();
    }
});

app.patch("/events/:id", async (req, res) => {
    const id = req.params["id"];
    const data = req.body;
    let result = await eventServices.updateEventById(id, data);
    if (result === undefined) {
        res.status(404).send("Event not found.").end();
    } else {
        res.status(204).send(result).end();
    }
});

app.post("/order", async (req, res) => {
    const orderDetails = req.body;
    let orderId;

    try {
        orderId = await purchaseTickets(orderDetails);
    } catch (err) {
        res.status(404).send(err.message).end();
        return;
    }

    emailService.send(orderDetails, orderId);

    res.send(orderId).status(201).end();
});

app.post("/events", async (req, res) => {
    const eventToAdd = req.body;
    const event = await eventServices.addEvent(eventToAdd);

    if (event != false) {
        res.status(201).json(event).end();
    } else {
        res.status(404).end();
    }
});

app.post("/users", async (req, res) => {
    const user = req.body;
    let createdUser;

    try {
        createdUser = await userServices.createUser(user);
    } catch (err) {
        res.status(404).send(err.message).end();
        return;
    }

    res.send(createdUser).status(201).end();
});

app.get("/users/:username", async (req, res) => {
    const username = req.params["username"];
    let result = await userServices.getUser(username);
    if (result === undefined) {
        res.status(404).send("User not found.").end();
    } else {
        res.send(result).status(200).end();
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});

async function validateCart(cart) {
    if (Object.keys(cart).length === 0) throw new Error("Cart is empty.");

    for (let event_id in cart) {
        let event;
        try {
            event = await eventServices.getEventById(event_id);
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
    const event = await eventServices.getEventById(event_id);
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

    result = await eventServices.updateEventById(event_id, {
        tickets_sold: tickets,
        tickets_available: available - quantity,
    });
}

async function purchaseTickets(orderDetails) {
    let cart = orderDetails.cart;
    await validateCart(cart);

    let orderId = Date.now() + "" + Math.floor(Math.random() * 1000);

    for (let eventId in cart) {
        await addTicketsToEvent(
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
