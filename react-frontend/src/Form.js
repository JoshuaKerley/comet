import React, {useState} from 'react';

function Form(props)
{
    const [event, setEvent] = useState(
        {
            coordinator: "Default",
            event_name: "",
            location: "",
            date: "",
            time_doors: "",
            time_show: "",
            description: "",
            tickets_total: "",
            tickets_available: "",
            tickets_price: "",
        }
    );

    function handleChange(event)
    {
        const { name, value } = event.target;
        if (name === "event_name")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: value,
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "location")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: value,
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "date")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: value,
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "time_doors")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: value,
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "time_show")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: value, 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "description")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: value,
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "tickets_total")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: value,
                tickets_available: event['tickets_available'],
                tickets_price: event['tickets_price']
            }
        );
        if (name === "tickets_available")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: value,
                tickets_price: event['tickets_price']
            }
        );
        if (name === "tickets_price")
        setEvent(
            {
                coordinator: event['coordinator'],
                event_name: event['event_name'],
                location: event['location'],
                date: event['date'],
                time_doors: event['time_doors'],
                time_show: event['time_show'], 
                description: event['description'],
                tickets_total: event['tickets_total'],
                tickets_available: event['tickets_available'],
                tickets_price: value
            }
        );
    }

    return (
        <form>
        <label htmlFor="event_name">EventName</label>
        <input
            type="text"
            name="event_name"
            _id="event_name"
            value={event.event_name}
            onChange={handleChange} />
        <label htmlFor="location">Location</label>
        <input
            type="text"
            name="location"
            _id="location"
            value={event.location}
            onChange={handleChange} />
        <label htmlFor="date">Date</label>
        <input
            type="text"
            name="date"
            _id="date"
            value={event.date}
            onChange={handleChange} />
        <label htmlFor="time_doors">DoorsTime</label>
        <input
            type="text"
            name="time_doors"
            _id="time_doors"
            value={event.time_doors}
            onChange={handleChange} />
        <label htmlFor="time_show">ShowTime</label>
        <input
            type="text"
            name="time_show"
            _id="time_show"
            value={event.time_show}
            onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input
            type="text"
            name="description"
            _id="description"
            value={event.description}
            onChange={handleChange} />
        <label htmlFor="tickets_total">TotalTickets</label>
        <input
            type="text"
            name="tickets_total"
            _id="tickets_total"
            value={event.tickets_total}
            onChange={handleChange} />
        <label htmlFor="tickets_available">TicketAvailable</label>
        <input
            type="text"
            name="tickets_available"
            _id="tickets_available"
            value={event.tickets_available}
            onChange={handleChange} />
        <label htmlFor="tickets_price">TicketPrice</label>
        <input
            type="text"
            name="tickets_price"
            _id="tickets_price"
            value={event.tickets_price}
            onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );

    function submitForm()
    {
        props.handleSubmit(event);
        setEvent({coordinator: 'Default', event_name: '', location: '', date: '', time_doors: '', time_show: '', description: '', tickets_total: '', tickets_available: '', tickets_price: ''});
    }
}

export default Form;