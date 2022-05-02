import React from 'react'

function TableHeader()
{
  return (
    <thead>
      <tr>
        <th>EventName</th>
        <th>Location</th>
        <th>Date</th>
        <th>ShowTime</th>
        <th>DoorsTime</th>
        <th>Description</th>
        <th>TotalTickets</th>
        <th>TicketAvailable</th>
        <th>TicketPrice</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props)
{
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.event_name}</td>
        <td>{row.location}</td>
        <td>{row.date}</td>
        <td>{row.time_show}</td>
        <td>{row.time_doors}</td>
        <td>{row.descprition}</td>
        <td>{row.tickets_total}</td>
        <td>{row.tickets_available}</td>
        <td>{row.tickets_price}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {rows}
    </tbody>
  );
}

function Table(props)
{
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;