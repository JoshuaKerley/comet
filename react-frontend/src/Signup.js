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

function Signup() {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    function handleChange(type) {
        return (e) => {
            setLogin({ ...login, [type]: e.target.value });
        };
    }

    async function submitForm() {
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/users",
                login
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 15, mb: 5, alignItems: "center" }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Typography variant="h2" align="center">
                    Sign Up
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
                        label="Username"
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
                    <TextField
                        required
                        label="Password"
                        type="password"
                        value={login.password}
                        onChange={handleChange("password")}
                        inputProps={{
                            style: { height: "20px" },
                        }}
                        sx={{
                            width: { xs: "100%", sm: "49%" },
                        }}
                        // autoComplete="off"
                    />
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 4 }}
                        onClick={submitForm}>
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;
