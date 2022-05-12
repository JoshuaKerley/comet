import React, { useState } from "react";
import {
    Container,
    Box,
    Grid,
    TextField,
    FormControlLabel,
    Button,
} from "@mui/material";

function Login(props) {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    console.log(login);

    function handleChange(type) {
        return (e) => {
            setLogin({ ...login, [type]: e.target.value });
        };
    }

    function submitForm() {
        props.getLoginAuth(login.username, login.password);
        setLogin({ username: "", password: "" });
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
            <Box
                sx={{
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
                    // autoComplete="off"
                />
                <TextField
                    required
                    label="Password"
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
                <Button variant="contained" sx={{ mt: 4 }} onClick={submitForm}>
                    Log In
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
