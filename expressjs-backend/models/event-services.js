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
exports.getUser = getUser;
