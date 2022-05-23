import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";
import { isAuthenticated } from "./auth";
import { Container, Typography } from "@mui/material";

function EventsView() {
    const [events, setEvents] = useState([]);
    const { id, username } = isAuthenticated(); // checks if current user is authenticated and returns user info if so

    useEffect(() => {
        fetchMyEvents(id).then((result) => {
            if (result) {
                setEvents(result);
            }
        });
    }, []);

    async function fetchMyEvents(id) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION +
                    "/events/user/" +
                    id
            );
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function makeDeleteCall(event) {
        try {
            const response = await axios.delete(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION +
                    "/events/" +
                    event._id
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function removeEvent(index) {
        let result = await makeDeleteCall(events[index]);
        if (result.status === 204) {
            const updated = events.filter((event, i) => {
                return i !== index;
            });
            setEvents(updated);
        }
    }

    return (
        <Container maxWidth={"xl"} sx={{ mt: 5, pb: 5 }}>
            <Typography variant="h2" align="center">
                My Events
            </Typography>
            {events.map((event, i) => {
                return (
                    <Event
                        key={i}
                        index={i}
                        eventData={event}
                        removeEvent={removeEvent}
                    />
                );
            })}
        </Container>
    );
}

export default EventsView;
