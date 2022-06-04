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
    Link,
} from "@mui/material";
import axios from "axios";

function Signup() {
    const [signup, setSignup] = useState({
        username: "",
        password: "",
    });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    function handleChange(type) {
        return (e) => {
            setSuccess(false);
            setSignup({ ...signup, [type]: e.target.value });
        };
    }

    async function submitForm() {
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/users",
                signup
            );
            setSuccess(true);
            setSignup({ username: "", password: "" });
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
                {success ? (
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{ color: "green" }}>
                            Successfully signed up!
                        </Typography>
                    </Box>
                ) : null}
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
                        value={signup.username}
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
                        value={signup.password}
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
                <Box sx={{ mt: 2 }}>
                    <Link href="/seller/login">
                        <Typography sx={{ "&:hover": { pointer: "cursor" } }}>
                            Have an account already? Click here to log in!
                        </Typography>
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;
