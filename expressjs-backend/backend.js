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
    if (result === undefined || result.length == 0)
        res.status(404).send("Resource not found.");
    else {
        res.send(result);
    }
});

app.delete("/events/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = await services.deleteEventById(id);
    if (result === undefined) res.status(404).send("Resource not found.");
    else {
        res.status(204).end();
    }
});

app.post("/events", async (req, res) => {
    const eventToAdd = req.body;
    const event = await services.addEvent(eventToAdd);

    if (event != false) {
        res.status(201).json(event).end();
    } else {
        res.status(404).end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
