const mongoose = require("mongoose");
const eventModel = require("./events");
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
    if (userID) return await eventModel.find({ user: userID });
    else return await eventModel.find();
}

// async function findUserById(id) {
//   try {
//     return await userModel.findById(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

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

exports.getEvents = getEvents;
exports.addEvent = addEvent;
exports.deleteEventById = deleteEventById;
