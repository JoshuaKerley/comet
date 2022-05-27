import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

function SelectSeller() {
    const [seller, setSeller] = useState({
        username: "",
    });
    const navigate = useNavigate();

    function handleChange(type) {
        return (e) => {
            setSeller({ ...login, [type]: e.target.value });
        };
    }

    async function getSeller(user) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/users/" + user
            );
            if (response.data.username) {
                console.log("SELLER FOUND");
                return response.data;
            } else {
                console.log("SELLER DOES NOT EXIST");
                return false;
            }
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function submitForm() {
        const result = await getSeller(login.username);
        console.log(result);
        if (result) {
            setLogin({ username: "", password: "" });
            localStorage.setItem(
                "user",
                JSON.stringify({ id: result._id, username: result.username })
            );
            navigate("/buyer/events/view");
        }
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 15, mb: 5, alignItems: "center" }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Typography variant="h2" align="center">
                    Log In
                </Typography>
                <Box
                    sx={{
                        mt: 5,
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                    }}>
                    <TextField
                        required
                        label="Seller"
                        value={login.username}
                        onChange={handleChange("username")}
                        inputProps={{
                            style: { height: "20px" },
                        }}
                        sx={{
                            mb: { xs: 2, sm: 0 },
                            width: { xs: "100%", sm: "49%" },
                        }}
                        autoComplete="off"
                    />
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 4 }}
                        onClick={submitForm}>
                        Log In
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default SelectSeller;
