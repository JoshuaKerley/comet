const services = require("./event-services.js");

const event = {
    coordinator: "testcoordinator",
    event_name: "test event",
    location: "test location",
    date: "2022-05-23T19:48:05.867Z",
    time_doors: "2022-05-23T19:48:05.867Z",
    time_show: "2022-05-23T19:48:05.867Z",
    description: "test description",
    tickets_total: 10,
    tickets_available: 10,
    tickets_price: 5,
    tickets_sold: [],
};

let createdEvent;
let createdUser;

test("Testing add event", async () => {
    createdEvent = await services.addEvent(event);
    expect(createdEvent).not.toBe(false);
});

test("Testing add event - invalid", async () => {
    nullEvent = await services.addEvent(null);
    expect(nullEvent).toBe(false);
});

test("Testing get events - all", async () => {
    let events = await services.getEvents();
    expect(events).not.toBe(null);
    expect(events).not.toEqual([]);
});

test("Testing get events - user", async () => {
    let events = await services.getEvents("testcoordinator");
    expect(events).not.toBe(null);
    expect(events).not.toEqual([]);
});

test("Testing get event by id - exists", async () => {
    let result = await services.getEventById(createdEvent._id);
    expect(result._id).toEqual(createdEvent._id);
});

test("Testing update event by id - exists", async () => {
    let result = await services.updateEventById(createdEvent._id, {
        event_name: "updated name",
        location: "updated location",
    });
    expect(result.event_name).toEqual("updated name");
    expect(result.location).toEqual("updated location");
});

test("Testing remove event - exists", async () => {
    let result = await services.deleteEventById(createdEvent._id);
    expect(result).not.toBe(null);
});

test("Testing get event by id - doesn't exist", async () => {
    let result = await services.getEventById(createdEvent._id);
    expect(result).toBe(null);
});

test("Testing update event by id - doesn't exist", async () => {
    let result = await services.updateEventById(createdEvent._id, {
        event_name: "updated name",
        location: "updated location",
    });
    expect(result == null).toBeTruthy();
});

test("Testing remove event - doesn't exist", async () => {
    let result = await services.deleteEventById(createdEvent._id);
    expect(result == null).toBeTruthy();
});

test("Testing get user", async () => {
    let result = await services.getUser("nulluser");
    expect(result == null).toBeTruthy();
});
