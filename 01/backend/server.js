var express = require('express');
var app = express();
const PORT = 2121;
var cors = require('cors');
var bodyparser = require('body-parser');
var fs = require('fs');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/register", (req, res) => {
    var obj = {
        email: req.body.email,
        password: req.body.password,
    };
    fs.readFile("./users.json", "utf-8", (err, data) => {
        var users = data ? JSON.parse(data) : [];
        users.push(obj);
        fs.writeFile("./users.json", JSON.stringify(users), () => {
            res.send("Registration Successful");
            res.end();
        });
    });
});

app.post("/login", (req, res) => {
    fs.readFile("./users.json", "utf-8", (err, data) => {
        var users = data ? JSON.parse(data) : [];
        var user = users.find(u => u.email === req.body.email && u.password === req.body.password);
        if (user) {
            res.send("Login Successful");
        } else {
            res.status(401).send("Invalid Credentials");
        }
        res.end();
    });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT);
});
