import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EventsView from "./EventsView";
import EventsAdd from "./EventsAdd";
import EventsEdit from "./EventsEdit";
import Login from "./Login";
import axios from "axios";
import { Routes, Route } from 'react-router-dom';

// const backendURL = "https://comet-eventright-backend.herokuapp.com";

function MyApp() {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/seller/events/view" element={<EventsView />} />
                <Route path="/seller/events/add" element={<EventsAdd /> } />
                <Route path="/seller/events/edit/:id" element={<EventsEdit /> } />
                {/* <Table eventData={events} removeEvent={removeOneEvent} /> */}
            </Routes>
        </div>
    );
}

export default MyApp;
