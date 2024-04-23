# Light Mailer

You can utilize this automated version of Nodemailer to easily send emails. All you need to do is create a REST API by integrating Light Mailer and then make a request to it using a frontend, including the necessary data you want to send in the email.

# Why Light Mailer

- Easy to use.
- No any advanced configurations. (Configured everything in nodemailer for you.)
- Best for small projects.

# Installation

You can install this package using npm:

```
npm install light-mailer
```

# Usage

### Quick Tutorial

First import necessary modules into your project:

```
const lightMailer = require('light-mailer');
const express = require("express");
const fs = require("fs");
```

Next, create an email template and read its content like this:

```
const template = fs.readFileSync("./template.html", "utf8");
```

The email template must include placeholders with the exact names of the keys of the JavaScript object which you receive in the request body. (Please declare the placeholders like this: `{{}}` ) In this case, the email template will look like this:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Name - {{name}}</p>
    <p>Name - {{message}}</p>
</body>
</html>
```

Then create a REST API using Express.js and add the API endpoint "/send-mail" as follows:

```
const app = express();
const PORT = 4000 || process.env.PORT;

app.use(express.json());

app.post("/send-mail", (req, res) => {
    // ...
});

app.listen(PORT, (req, res) => {
    console.log("Server is running on port", PORT);
});
```

After that, you can get the data that you want to send as an email from the request body. Next, create a new instance of lightMailer with the necessary arguments. Then call the sendMail function with the data that you want to send as an email and the email template. Finally, write the response as follows:

```
app.post("/send-mail", async (req, res) => {
    const data = req.body;

    const mail = new lightMailer(
        "your-gmail@gmail.com",
        "your-gmail-app-password",
        "receiver's-gmail@gmail.com"
    );

    try {
        await mail.sendMail(data, template, "The Subject...");

        res.status(200).json({
            status: "success",
            data: {
                message: "Email sent successfully!",
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: {
                message: error.message,
            },
        });
    }
});
```

> Please create an app password for gmail and put it in the arguments.

You can check if the API works using Postman. Just make a POST request to the following link: `127.0.0.1:4000/send-mail` and add the JSON object below to the request body.
```
{
    "name": "Example",
    "message": "Hello World!"
}
```

Afterward, check the recipient's email address that you provided when creating the lightMailer instance.
<br><br>
This is the end of the quick tutorial.

# Functions & Parameters

> These functions include the lightMailer function, which was created in the quick tutorial. Note that you can use any name for that!

| Function | Parameters |
|----------|----------|
| lightMailer | Sender's email, Password,  Receiver's email |
| sendMail | data, template |

# Changelog

All notable changes to this project will be documented in this section.

## [1.2.2] - 2024-04-23
### Changed
- Minor bug fixes

## [1.2.0] - 2024-04-22
### Changed
- Improved error handling

### Fixed
- Authentication issue with gmail passwords

## [1.0.8]
- Initially Released

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.