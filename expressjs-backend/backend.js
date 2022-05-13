const express = require("express");
const cors = require("cors");
const services = require("./models/event-services");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//GETS ALL EVENTS (SHOULD NOT BE NEEDED ON FRONTEND)
app.get("/events", async (req, res) => {
    let result = await services.getEvents();
    res.send(result).end();
});

//GETS EVENTS CREATED BY SPECIFIC USER (EVENT COORDINATOR)
app.get("/events/:user", async (req, res) => {
    const user = req.params["user"]; //or req.params.id
    let result = await services.getEvents(user);
    res.send(result).end();
});

app.delete("/events/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = await services.deleteEventById(id);
    if (result === undefined) res.status(404).send("Event not found.");
    else {
        res.status(204).end();
    }
});

app.patch("/events/:id", async (req, res) => {
    const id = req.params["id"];
    const data = req.body;
    let result = await services.updateEventById(id, data);
    if (result === undefined) {
        res.status(404).send("Event not found.").end();
    } else {
        res.status(204).send(result).end();
    }
});

app.post("/events/:id/:number", async (req, res) => {
    const event_id = req.params["id"];
    const num_tickets = req.params["number"];
    const ticket = req.body;

    let added;

    try {
        added = await services.addTickets(event_id, num_tickets, ticket);
    } catch (err) {
        if (err.message.indexOf("Cast to ObjectId failed") !== -1)
            res.status(404).send("Event not found.").end();
        else res.status(404).send(err.message).end();
        return;
    }

    res.status(201).json(added).end();
});

app.post("/events", async (req, res) => {
    const eventToAdd = req.body;
    console.log(req.body);
    const event = await services.addEvent(eventToAdd);

    if (event != false) {
        res.status(201).json(event).end();
    } else {
        res.status(404).end();
    }
});

app.get("/users/:username", async (req, res) => {
    const username = req.params["username"];
    let result = await services.getUser(username);

    if (result === undefined) {
        res.status(404).send("User not found.").end();
    } else {
        res.send(result).status(200).end();
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
