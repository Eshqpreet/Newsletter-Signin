const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const https = require("https");


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/e948893435";

    const options = {
        method: "post",
        auth: "eshqpreet29:c36e0dfef2cc9b50e7bf9687287e44e5-us10"
    };

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.POST || 3000, () => {
    console.log("Server is running at port 3000")
});

//API KEY
//c36e0dfef2cc9b50e7bf9687287e44e5-us10

//List ID
//e948893435.