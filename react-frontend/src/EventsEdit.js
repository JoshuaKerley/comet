import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Box,
    Grid,
    Paper,
    TextField,
    FormControlLabel,
    Button,
    Typography,
} from "@mui/material";
import {
    LocalizationProvider,
    DesktopDatePicker,
    DesktopTimePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import { isAuthenticated } from "./auth";

function EventsEdit() {
    const [event, setEvent] = useState({
        coordinator: isAuthenticated() && isAuthenticated().id,
        event_name: "",
        location: "",
        date: new Date(),
        time_doors: new Date(),
        time_show: new Date(),
        description: "",
        tickets_total: "",
        tickets_available: "",
        tickets_price: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEventById(id).then((result) => {
            if (result) {
                setEvent({
                    ...event,
                    ...result,
                    date: new Date(result.date),
                    time_doors: new Date(result.time_doors),
                    time_show: new Date(result.time_show),
                });
            }
        });
    }, []);

    async function fetchEventById(id) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION +
                    "/events/id/" +
                    id
            );
            return response.data;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function handleChange(type) {
        return (e) => {
            if (type === "date") {
                console.log(e);
                setEvent({ ...event, [type]: e });
            } else if (type === "time_doors" || type === "time_show") {
                console.log(e);
                setEvent({ ...event, [type]: e });
            } else {
                setEvent({ ...event, [type]: e.target.value });
            }
        };
    }

    async function editEvent() {
        try {
            const response = await axios.patch(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/events/" + id,
                event
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function submitForm() {
        const result = await editEvent();
        if (result) {
            setEvent({
                coordinator: "Default",
                event_name: "",
                location: "",
                date: new Date(),
                time_doors: new Date(),
                time_show: new Date(),
                description: "",
                tickets_total: "",
                tickets_available: "",
                tickets_price: "",
            });
            navigate("/seller/events/view");
        }
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Typography variant="h2" align="center">
                    Edit Event
                </Typography>
                <Box
                    sx={{
                        mt: 5,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <TextField
                        required
                        label="Event Name"
                        value={event.event_name}
                        onChange={handleChange("event_name")}
                        inputProps={{
                            style: { height: "20px" },
                        }}
                        sx={{
                            mb: 4,
                            width: "100%",
                        }}
                    />
                    <TextField
                        required
                        label="Event Location"
                        value={event.location}
                        onChange={handleChange("location")}
                        inputProps={{
                            style: { height: "20px" },
                        }}
                        sx={{
                            mb: 4,
                            width: "100%",
                        }}
                    />
                    <Box sx={{ mb: 4, display: "flex", flexDirection: "row" }}>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Event Date"
                                    format="hh:mm A"
                                    minDate={new Date()}
                                    value={event.date}
                                    onChange={handleChange("date")}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    InputProps={{ readOnly: false }}
                                    InputAdornmentProps={{ position: "start" }}
                                    // PopperProps={{placement: "bottom-end"}}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopTimePicker
                                    label="Doors Time"
                                    format="YYYY-MM-DD hh:mm A"
                                    minTime={
                                        event.date &&
                                        event.date.toDateString() ===
                                            new Date().toDateString()
                                            ? new Date()
                                            : null
                                    }
                                    value={event.time_doors}
                                    onChange={handleChange("time_doors")}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    InputProps={{ readOnly: false }}
                                    InputAdornmentProps={{ position: "start" }}
                                    // PopperProps={{placement: "bottom-end"}}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopTimePicker
                                    label="Show Time"
                                    format="YYYY-MM-DD hh:mm A"
                                    minTime={
                                        event.date &&
                                        event.date.toDateString() ===
                                            new Date().toDateString()
                                            ? new Date()
                                            : null
                                    }
                                    value={event.time_show}
                                    onChange={handleChange("time_show")}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    InputProps={{ readOnly: false }}
                                    InputAdornmentProps={{ position: "start" }}
                                    // PopperProps={{placement: "bottom-end"}}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mb: 4,
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <TextField
                                required
                                label="Total Tickets"
                                type="number"
                                value={event.tickets_total}
                                onChange={handleChange("tickets_total")}
                                inputProps={{
                                    style: { height: "20px" },
                                    min: 1,
                                }}
                                sx={{
                                    width: "100%",
                                }}
                            />
                        </Box>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <TextField
                                required
                                label="Available Tickets"
                                type="number"
                                value={event.tickets_available}
                                onChange={handleChange("tickets_available")}
                                inputProps={{
                                    style: { height: "20px" },
                                    min: 1,
                                }}
                                sx={{
                                    width: "100%",
                                }}
                            />
                        </Box>
                        <Box sx={{ mr: 4, width: "200px" }}>
                            <TextField
                                required
                                label="Ticket Price"
                                type="number"
                                value={event.tickets_price}
                                onChange={handleChange("tickets_price")}
                                inputProps={{
                                    style: { height: "20px" },
                                    min: 0,
                                }}
                                sx={{
                                    width: "100%",
                                }}
                            />
                        </Box>
                    </Box>
                    <TextField
                        required
                        label="Event Description"
                        value={event.description}
                        onChange={handleChange("description")}
                        inputProps={{
                            style: {
                                height: "100px",
                                border: "none",
                                boxShadow: "none",
                            },
                        }}
                        sx={{
                            mb: 2,
                            width: "100%",
                        }}
                        multiline
                    />
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={submitForm}>
                        Confirm
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default EventsEdit;
