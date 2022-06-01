import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Purchase() {
    const [cart, setCart] = useState({});
    const [cost, setCost] = useState(5);
    const [user, setUser] = useState({
        name: "",
        email: "",
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setCart(location.state.cart);
        }
    }, []);

    useEffect(() => {
        function calculateTotalCost() {
            let total_cost = 0;
            for (const id in cart) {
                total_cost +=
                    parseInt(cart[id]["num_tickets"]) *
                    cart[id]["ticket_price"];
            }

            return total_cost;
        }
        setCost(calculateTotalCost());
    }, [cart]);

    function handleChange(type) {
        return (e) => {
            setUser({ ...user, [type]: e.target.value });
        };
    }

    async function orderTickets() {
        let final_cart = {};
        for (let id in cart) {
            final_cart[id] = cart[id]["num_tickets"];
        }

        let order = {
            name: user.name,
            email: user.email,
            cart: final_cart,
        };

        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL_PRODUCTION + "/order",
                order
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function confirmPurchase() {
        const result = await orderTickets();
        console.log("result", result);
        if (result) {
            setUser({
                name: "",
                email: "",
            });
            navigate("/buyer/home");
        }
    }

    return (
        <Container maxWidth={"xl"} sx={{ mt: 15, pb: 5 }}>
            <Paper
                elevation={5}
                sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                <Typography variant="h2" align="center">
                    Checkout
                </Typography>
                <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                    {`Your total is $${cost}`}
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
                        label="Name"
                        value={user.name}
                        onChange={handleChange("name")}
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
                        label="Email"
                        type="email"
                        value={user.email}
                        onChange={handleChange("email")}
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
                        onClick={confirmPurchase}>
                        Purchase
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Purchase;
