# Light Mailer

You can use this automated version of Nodemailer to send emails easily.

## Installation

You can install this package using npm:

```
npm install light-mailer
```

## Usage

First import necessary modules into your project:

```
const lightMailer = require('light-mailer');
const express = require("express");
const fs = require("fs");
```

Next, create an email template and import it like this:

```
const template = fs.readFileSync("./template.html", "utf8");
```

The email template must include placeholders with the exact names of the keys of the JavaScript object. In this case, the email template will look like this:

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
app.post("/send-mail", (req, res) => {
    const data = req.body;
    const mail = new lightMailer(
        "your-gmail@gmail.com",
        "your-gmail-password",
        "sender's-gmail@gmail.com",
        "receiver's-gmail@gmail.com"
    );

    mail.sendMail(data, template);

    res.status(200).json({
        status: "success",
        data: {
            message: "Email sent successfully!",
        },
    });
});
```
<br>

> If you can't see the images, please visit the GitHub repository and read the README file.
<br>
You can check if the API works using Postman like this: <br><br>

![280512501-3d407f74-8bdc-424f-9dff-21932e908b94](https://github.com/methupaPerera/light-mailer/assets/108886352/b593335e-8468-461f-9e9e-52d597c07b27)
<br><br>

The result should look like this: <br><br>
![280512870-18b947f4-0516-4954-ae50-d525e074a3a0](https://github.com/methupaPerera/light-mailer/assets/108886352/ec670832-e574-4c91-aed9-db228c2d55da)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
