import React, {useState} from 'react';

function Form(props)
{
    const [person, setPerson] = useState(
        {
            event_name: "",
            location: "",
            date: "",
            time_doors: "",
            time_start: "",
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
        setPerson(
            {
                event_name: value,
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "location")
        setPerson(
            {
                event_name: person['event_name'],
                location: value,
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "date")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: value,
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "time_doors")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: value,
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "time_start")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: value, 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "description")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: value,
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "tickets_total")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: value,
                tickets_available: person['tickets_available'],
                tickets_price: person['tickets_price']
            }
        );
        if (name === "tickets_available")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: value,
                tickets_price: person['tickets_price']
            }
        );
        if (name === "tickets_price")
        setPerson(
            {
                event_name: person['event_name'],
                location: person['location'],
                date: person['date'],
                time_doors: person['time_doors'],
                time_start: person['time_start'], 
                description: person['description'],
                tickets_total: person['tickets_total'],
                tickets_available: person['tickets_available'],
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
            value={person.event_name}
            onChange={handleChange} />
        <label htmlFor="location">Location</label>
        <input
            type="text"
            name="location"
            _id="location"
            value={person.location}
            onChange={handleChange} />
        <label htmlFor="date">Date</label>
        <input
            type="text"
            name="date"
            _id="date"
            value={person.date}
            onChange={handleChange} />
        <label htmlFor="time_doors">DoorsTime</label>
        <input
            type="text"
            name="time_doors"
            _id="time_doors"
            value={person.time_doors}
            onChange={handleChange} />
        <label htmlFor="time_start">ShowTime</label>
        <input
            type="text"
            name="time_start"
            _id="time_start"
            value={person.time_start}
            onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input
            type="text"
            name="description"
            _id="description"
            value={person.description}
            onChange={handleChange} />
        <label htmlFor="tickets_total">TotalTickets</label>
        <input
            type="text"
            name="tickets_total"
            _id="tickets_total"
            value={person.tickets_total}
            onChange={handleChange} />
        <label htmlFor="tickets_available">TicketAvailable</label>
        <input
            type="text"
            name="tickets_available"
            _id="tickets_available"
            value={person.tickets_available}
            onChange={handleChange} />
        <label htmlFor="tickets_price">TicketPrice</label>
        <input
            type="text"
            name="tickets_price"
            _id="tickets_price"
            value={person.tickets_price}
            onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );

    function submitForm()
    {
        props.handleSubmit(person);
        setPerson({event_name: '', location: '', date: '', time_doors: '', time_start: '', description: '', tickets_total: '', tickets_available: '', tickets_price: ''});
    }
}

export default Form;