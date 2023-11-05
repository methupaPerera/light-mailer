const nodemailer = require("nodemailer");

class LightMailer {
    constructor(email, password, from, to) {
        this.email = email; // User email
        this.password = password; // User password
        this.from = from; // Sender's email
        this.to = to; // Receiver's email
    }

    htmlReplacer(data, template) {
        // Replace the html code according to the data of 
        // request body.
        for (const key in data) {
            template = template.replace(`{{${key}}}`, data[key]);
        }
        return template;
    }

    sendMail(data, template) {
        // Automation function of the nodemailer.
        // This will send the email with the email template.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.email,
                pass: this.password,
            },
        });

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: "New Contact Message.",
            html: this.htmlReplacer(data, template),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}

module.exports = LightMailer;
