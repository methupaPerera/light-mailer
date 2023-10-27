const nodemailer = require("nodemailer");

class Mailer {
    constructor(email, password, from, to) {
        this.email = email;
        this.password = password;
        this.from = from;
        this.to = to;
    }

    htmlReplacer(data, template) {
        for (const key in data) {
            console.log(key);
            template = template.replace(`{{${key}}}`, data[key]);
        }
        console.log(template);
        return template;
    }

    sendMail(data, template) {
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

module.exports = Mailer;
