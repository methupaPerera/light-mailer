const nodemailer = require("nodemailer");

class LightMailer {
    constructor(email, password, from, to) {
        this.email = email; // User email
        this.password = password; // User app password
        this.from = from; // Sender's email
        this.to = to; // Receiver's email
    }

    async sendMail(data, template, subject = "Subject...") {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.email,
                pass: this.password,
            },
        });

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: this.htmlReplacer(data, template),
        };

        const info = await transporter.sendMail(mailOptions);

        if (info instanceof Promise) {
            throw new Error(info);
        }
    }

    htmlReplacer(data, template) {
        // Replace the html code according to the data of request body.
        for (const key in data) {
            template = template.replace(`{{${key}}}`, data[key]);
        }

        return template;
    }
}

module.exports = LightMailer;
