import { useState, useEffect } from "react";
import {
    Container,
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Event from "./Event";
import TicketModal from "./TicketModal";
import { useNavigate } from "react-router-dom";

function Home() {
    const [events, setEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [cart, setCart] = useState({});
    const [numTickets, setNumTickets] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents()
            .then((result) => {
                console.log(result);
                if (result) {
                    setEvents(result);
                    setFilterEvents(result);
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
        let index;
        for (let i = 0; i < events.length; i++) {
            if (filterEvents[i]._id === id) {
                index = i;
                break;
            }
        }

        if (num_tickets > 0) {
            setCart({
                ...cart,
                [id]: {
                    num_tickets: num_tickets,
                    ticket_price: filterEvents[index].tickets_price,
                },
            });
        } else if (id in cart) {
            setCart((prev) => {
                delete cart[id];
                return cart;
            });
        }
    }

    function openModal(index) {
        setSelectedEvent(filterEvents[index]);
        setNumTickets(
            filterEvents[index]._id in cart
                ? cart[filterEvents[index]._id]["num_tickets"]
                : 0
        );
        setOpen(true);
    }

    function filter() {
        setFilterEvents(
            events.filter((event) => {
                return event.event_name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
        );
        setSearch("");
    }

    return (
        <Container maxWidth={"xl"} sx={{ mt: 15, pb: 5 }}>
            <Typography variant="h2" align="center">
                Buy Tickets!
            </Typography>
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}>
                <Button
                    variant="contained"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() =>
                        navigate("/purchase", { state: { cart: cart } })
                    }>
                    <ShoppingCartIcon fontSize={"large"} />
                </Button>
            </Box>
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                <TextField
                    placeholder="Search by Show"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    inputProps={{
                        style: { height: "20px" },
                    }}
                    sx={{
                        width: { xs: "100%", sm: "49%" },
                    }}
                    autoComplete="off"
                />
                <Button
                    variant="contained"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={filter}>
                    <SearchIcon fontSize={"large"} />
                </Button>
            </Box>
            {loaded && filterEvents.length > 0 ? (
                filterEvents.map((event, i) => {
                    return (
                        <Event
                            key={event._id}
                            index={i}
                            eventData={event}
                            removeEvent={null}
                            viewTickets={openModal}
                            eventCart={
                                event._id in cart
                                    ? cart[event._id]["num_tickets"]
                                    : 0
                            }
                        />
                    );
                })
            ) : loaded && events.length > 0 && filterEvents.length == 0 ? (
                <Typography variant="h5" align="center" sx={{ mt: 5 }}>
                    No events match your search
                </Typography>
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
                    numTickets={numTickets}
                    setNumTickets={setNumTickets}
                />
            ) : null}
        </Container>
    );
}

export default Home;
