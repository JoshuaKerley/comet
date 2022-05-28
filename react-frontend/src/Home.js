import { useState, useEffect } from "react";
import { Container, Box, Paper, Button, Typography } from "@mui/material";
import axios from "axios";
import Event from "./Event";
import TicketModal from "./TicketModal";

function Home() {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [cart, setCart] = useState({});

    useEffect(() => {
        fetchEvents()
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

    async function fetchEvents() {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/events"
            );
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function handleCart(id, num_tickets) {
        console.log("cart", cart);
        if (num_tickets > 0) {
            setCart({ ...cart, [id]: num_tickets });
        } else if (id in cart) {
            setCart((prev) => {
                delete cart[id];
                return cart;
            });
        }
    }

    function openModal(index) {
        console.log(index);
        setSelectedEvent(events[index]);
        setOpen(true);
    }

    return (
        <Container maxWidth={"xl"} sx={{ mt: 15, pb: 5 }}>
            <Typography variant="h2" align="center">
                Buy Tickets!
            </Typography>
            {loaded && events.length > 0 ? (
                events.map((event, i) => {
                    return (
                        <Event
                            key={i}
                            index={i}
                            eventData={event}
                            removeEvent={null}
                            viewTickets={openModal}
                        />
                    );
                })
            ) : loaded && events.length == 0 ? (
                <Typography variant="h5" align="center" sx={{ mt: 5 }}>
                    No events available yet
                </Typography>
            ) : null}

            {loaded && selectedEvent ? (
                <TicketModal
                    eventData={selectedEvent}
                    cart={cart}
                    handleCart={handleCart}
                    open={open}
                    setOpen={setOpen}
                />
            ) : null}
        </Container>
    );
}

export default Home;
