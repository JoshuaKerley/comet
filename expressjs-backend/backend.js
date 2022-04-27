const express = require('express');
const cors = require('cors');
const services = require('./models/user-services')
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = await services.getUsers(name, job)
    res.send(result).end();
});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await services.findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        res.send(result);
    }
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await services.deleteUserById(id);
    if (result === undefined)
        res.status(404).send('Resource not found.');
    else {
        res.status(204).end();
    }
});

app.post('/users', async (req, res) => {
    const userToAdd = req.body;
    const user = await services.addUser(userToAdd);

    if(user != false) {
        res.status(201).json(user).end();
    }
    else {
        res.status(404).end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});