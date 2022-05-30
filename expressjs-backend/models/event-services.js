const mongoose = require("./mongoose");
const eventModel = require("./events");

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
        return await eventToAdd.save();
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

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.deleteEventById = deleteEventById;
exports.updateEventById = updateEventById;
