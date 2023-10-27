const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "methupapereradev@gmail.com",
        pass: "cgakgveeihuicrzu",
    },
});

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
        res.status(500).json(
            JSON.stringify({
                status: "failed",
                data: {
                    message: "Failed to send email !",
                },
            })
        );
    } else {
        console.log("Email sent: " + info.response);
        res.status(200).json(
            JSON.stringify({
                status: "success",
                data: {
                    message: "Email sent !",
                },
            })
        );
    }
});
