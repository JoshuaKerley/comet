import { useEffect, useState } from "react";
import { Modal, Box, TextField, Paper, Typography } from "@mui/material";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function TicketModal({
    eventData,
    cart,
    handleCart,
    open,
    setOpen,
    numTickets,
    setNumTickets,
}) {
    // console.log("initial", eventData._id in cart ? cart[eventData._id] : 0);
    // const [numTickets, setNumTickets] = useState(
    //     eventData._id in cart ? cart[eventData._id] : 0
    // );
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
    const day = new Date(date).getDay();
    const month = monthNames[new Date(date).getMonth()];

    return (
        <Modal
            open={open}
            onClose={() => {
                handleCart(_id, numTickets);
                setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Paper
                elevation={10}
                sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "white",
                    borderRadius: "15px",
                }}>
                <Box
                    sx={{
                        width: "20%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography variant="h5">{month}</Typography>
                    <Typography variant="h4">{day}</Typography>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        width: "60%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography variant="h5">{event_name}</Typography>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        {location}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1 }}>{`Doors: ${new Date(
                        time_doors
                    ).toLocaleTimeString()}, Show: ${new Date(
                        time_show
                    ).toLocaleTimeString()}`}</Typography>
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        {description}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        width: "20%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography variant="h5">{`Price: $${tickets_price}`}</Typography>
                    <TextField
                        required
                        label="# of Tickets"
                        type="number"
                        value={numTickets}
                        onChange={(e) => setNumTickets(e.target.value)}
                        inputProps={{
                            style: { height: "10px" },
                            min: 0,
                            max: tickets_available,
                        }}
                        sx={{
                            mt: 2,
                            width: "100%",
                        }}
                    />
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        {"Total Cost:"}
                    </Typography>
                    <Typography variant="h5">{`$${
                        numTickets * tickets_price
                    }`}</Typography>
                </Box>
            </Paper>
        </Modal>
    );
}

export default TicketModal;
