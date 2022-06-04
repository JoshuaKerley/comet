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

function Login() {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleChange(type) {
        return (e) => {
            setError(false);
            setLogin({ ...login, [type]: e.target.value });
        };
    }

    async function getLoginAuth(user, pwd) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/users/" + user
            );
            if (response.data.password === pwd) {
                console.log("LOGIN SUCCESS");
                return response.data;
            } else {
                setError(true);
                console.log("FAILED LOGIN");
                return false;
            }
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function submitForm() {
        const result = await getLoginAuth(login.username, login.password);
        console.log(result);
        if (result) {
            setLogin({ username: "", password: "" });
            localStorage.setItem(
                "user",
                JSON.stringify({ id: result._id, username: result.username })
            );
            navigate("/seller/events/view");
        }
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 15, mb: 5, alignItems: "center" }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Typography variant="h2" align="center">
                    Log In
                </Typography>
                {error ? (
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{ color: "red" }}>
                            Incorrect username or password!
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
                        Log In
                    </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Link href="/seller/signup">
                        <Typography sx={{ "&:hover": { pointer: "cursor" } }}>
                            Don't have an account yet? Click here to sign up!
                        </Typography>
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
