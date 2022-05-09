import React, { useState } from "react";

function Login(props) {
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    function handleChange(change) {
        const { name, value } = change.target;
        if (name === "username") {
            setLogin({
                username: value,
                password: login["password"]
            });
        }
        if (name === "password") {
            setLogin({
                username: login["username"],
                password: value
            });
        }
    }

    return (
        <form>
            <label htmlFor="login">Username</label>
            <input
                type="text"
                name="username"
                _id="username"
                value={login.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                name="password"
                _id="password"
                value={login.password}
                onChange={handleChange}
            />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );

    function submitForm() {
        props.getLoginAuth(login.username, login.password);
    }
}

export default Login;
