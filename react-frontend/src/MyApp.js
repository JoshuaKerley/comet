import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Login from "./Login";
import axios from "axios";

function MyApp() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAll().then((result) => {
            if (result) setEvents(result);
        });
    }, []);

    return (
        <div className="container">
            <Login getLoginAuth={getLoginAuth} />
            <Table eventData={events} removeEvent={removeOneEvent} />
            <Form handleSubmit={updateList} />
        </div>
    );

    function removeOneEvent(index) {
        makeDeleteCall(events[index]).then((result) => {
            if (result.status === 204) {
                const updated = events.filter((event, i) => {
                    return i !== index;
                });
                setEvents(updated);
            }
        });
    }

    function updateList(event) {
        makePostCall(event).then((result) => {
            if (result && result.status === 201)
                setEvents([...events, result.data]);
        });
    }

    async function fetchAll() {
        try {
            const response = await axios.get("http://localhost:5000/events");
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function makePostCall(event) {
        try {
            const response = await axios.post(
                "http://localhost:5000/events",
                event
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function makeDeleteCall(event) {
        try {
            const response = await axios.delete(
                "http://localhost:5000/events/" + event._id
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getLoginAuth(user, pwd) {
        try {
            const response = await axios.get(
                "http://localhost:5000/users/" + user
            );
            if (response.data.password === pwd) {
                console.log("LOGIN SUCCESS");
            } else {
                console.log("FAILED LOGIN");
            }
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }
}

export default MyApp;
