import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";
import { isAuthenticated } from "./auth";
import { Container, Typography } from "@mui/material";

function EventsView() {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log(isAuthenticated().id);
        fetchMyEvents(isAuthenticated().id)
            .then((result) => {
                console.log(result);
                if (result) {
                    setEvents(result);
                }
            })
            .then((data) => {
                setLoaded(true);
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

    return (
        <Container maxWidth={"xl"} sx={{ mt: 15, pb: 5 }}>
            <Typography variant="h2" align="center">
                My Events
            </Typography>
            {loaded && events.length > 0 ? (
                events.map((event, i) => {
                    return (
                        <Event
                            key={i}
                            index={i}
                            eventData={event}
                        />
                    );
                })
            ) : loaded && events.length == 0 ? (
                <Typography variant="h5" align="center" sx={{ mt: 5 }}>
                    You currently have no events
                </Typography>
            ) : null}
        </Container>
    );
}

export default BuyerView;
