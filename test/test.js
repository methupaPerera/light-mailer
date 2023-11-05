const express = require("express");
const Mailer = require("../index.js");
const fs = require("fs");

const template = fs.readFileSync("./template.html", "utf8");

const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/send-mail", (req, res) => {
    const data = req.body;
    const mail = new Mailer(
        "methupapereradev@gmail.com",
        "cgakgveeihuicrzu",
        "methupapereradev@gmail.com",
        "methupapereradev@gmail.com"
    );
    mail.sendMail(data, template);
    res.status(200).json({
        status: "success",
        data: {
            message: "Email sent successfully!",
        },
    });
});

app.listen(PORT, (req, res) => {
    console.log("Server is running on port", PORT);
});
