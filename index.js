const fs = require("fs");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 4000;

const template = fs.readFileSync("../template.html", "utf8");

const replacer = (file, name, email, message) => {
    file = file.replace("{{name}}", name);
    file = file.replace("{{email}}", email);
    file = file.replace("{{message}}", message);

    return file;
};


app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "methupapereradev@gmail.com",
        pass: "cgakgveeihuicrzu",
    },
});

app.get("/", (req, res) => {
    res.status(200).send("<h1>Email Sender!</h1>");
});

app.post("/send-mail", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: "methupapereradev@gmail.com",
        to: "methupapereradev@gmail.com",
        subject: "New Contact Message.",
        html: replacer(template, name, email, message),
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send(
                JSON.stringify({
                    status: "failed",
                    data: {
                        message: "Failed to send email !",
                    },
                })
            );
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send(
                JSON.stringify({
                    status: "success",
                    data: {
                        message: "Email sent !",
                    },
                })
            );
        }
    });
});

app.listen(PORT, (req, res) => {
    console.log("Server is running on http://127.0.0.1:" + PORT);
});

module.exports = app;
