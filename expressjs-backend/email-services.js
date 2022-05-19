const nodeoutlook = require("nodejs-nodemailer-outlook");
const services = require("./models/event-services");
const fs = require("fs");
var handlebars = require("handlebars");

const dotenv = require("dotenv");

const auth = {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PWD,
};

async function send(orderDetails, orderId) {
    var html = await fs.promises.readFile("email_template.html", "utf8");

    let tickets = [];

    for (let eventId in orderDetails.cart) {
        const event = await services.getEventById(eventId);

        let currentOrderTickets = event.tickets_sold.filter(
            (ticket) => ticket.order_number == orderId
        );

        for (let ticket of currentOrderTickets) {
            tickets.push({
                event_name: event.event_name,
                date: event.date.toLocaleString().split(",")[0],
                doors: event.time_doors.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                }),
                show: event.time_show.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                }),
                number: ticket.id,
            });
        }
    }

    const template = handlebars.compile(html);
    const htmlToSend = template({ order_number: orderId, tickets: tickets });

    nodeoutlook.sendEmail({
        auth: auth,
        from: "ComeT Ticket Services <no-reply.cometix@outlook.com>",
        to: orderDetails.email,
        subject: "Ticket Order Confirmation",
        html: htmlToSend,
    });
}

exports.send = send;
