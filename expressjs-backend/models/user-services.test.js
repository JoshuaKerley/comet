const services = require("./user-services.js");

const user = {
    username: "testuser",
    password: "testpassword",
};

let createdUser;

test("Testing create user - doesn't exist", async () => {
    createdUser = await services.createUser(user);
    expect(createdUser).not.toBe(false);
});

test("Testing create user - already exists", async () => {
    await expect(services.createUser(user)).rejects.toThrow(
        "User already exists."
    );
});

test("Testing get user - exists", async () => {
    let result = await services.getUser(user.username);
    expect(result).toBeDefined();
});

test("Testing delete user - exists", async () => {
    let result = await services.deleteUserById(createdUser._id);
    expect(result).not.toBe(null);
});

test("Testing get user - doesn't exist", async () => {
    let result = await services.getUser(user.username);
    expect(result == null).toBeTruthy();
});

test("Testing delete user - doesn't exist", async () => {
    let result = await services.deleteUserById(createdUser._id);
    expect(result == null).toBeTruthy();
});
