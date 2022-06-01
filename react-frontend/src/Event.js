import { Box, Paper, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Event({ viewTickets, index, eventData, removeEvent, eventCart }) {
    const {
        _id,
        date,
        description,
        event_name,
        location,
        tickets_available,
        tickets_price,
        tickets_total,
        time_doors,
        time_show,
    } = eventData;
    const navigate = useNavigate();

    function renderField(label, data) {
        return (
            <Box
                sx={{
                    m: { xs: 1, sm: 2 },
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                    {label}
                </Typography>
                {label === "Available Tickets" && !data ? (
                    <Typography sx={{ color: "red" }}>{"SOLD OUT"}</Typography>
                ) : (
                    <Typography>{data}</Typography>
                )}
            </Box>
        );
    }

    return (
        <Paper
            elevation={5}
            sx={{ mt: 5, p: 5, display: "flex", flexDirection: "column" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                }}>
                {renderField("Name", event_name)}
                {renderField("Location", location)}
                {renderField("Date", new Date(date).toLocaleDateString())}
                {renderField(
                    "Show Time",
                    new Date(time_show).toLocaleTimeString()
                )}
                {renderField(
                    "Doors Time",
                    new Date(time_doors).toLocaleTimeString()
                )}
                {renderField("Description", description)}
                {renderField("Total Tickets", tickets_total)}
                {renderField("Available Tickets", tickets_available)}
                {renderField("Ticket Price", "$ " + tickets_price)}
            </Box>
            <Box
                sx={{
                    ml: { xs: 1, sm: 2 },
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                }}>
                {viewTickets ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                        }}>
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => viewTickets(index)}>
                            Select Tickets
                        </Button>
                        <Typography
                            sx={{
                                color: "red",
                                mt: { xs: 3 },
                                ml: { md: 3 },
                            }}>
                            {`Currently holding ${eventCart} tickets for this event.`}
                        </Typography>
                        <Typography
                            sx={{
                                color: "red",
                                mt: { xs: 1, md: 3 },
                                ml: { xs: 0, md: 1 },
                            }}>
                            {`Total cost: $${eventCart * tickets_price}`}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() =>
                                navigate(`/seller/events/edit/${_id}`)
                            }>
                            Edit Event
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, ml: 4 }}
                            onClick={() =>
                                removeEvent ? removeEvent(index) : null
                            }>
                            Delete Event
                        </Button>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}

export default Event;
