const mongoose = require("./mongoose");
const userModel = require("./users");

async function createUser(user) {
    if ((await getUser(user.username)) != null) {
        throw new Error("User already exists.");
    }
    const userToAdd = new userModel(user);
    return await userToAdd.save();
}

async function getUser(name) {
    return await userModel.findOne({ username: name });
}

async function deleteUserById(id) {
    return await userModel.findByIdAndDelete(id);
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.deleteUserById = deleteUserById;
