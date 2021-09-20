process.env.NODE_ENV === "production" || require("dotenv").config();
const path = require("path");
const express = require("express");
let app = express();
const port =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;

let getMessage = require("./chatbot.js");
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
};
app.use(express.json());
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
app.use(express.static("./client/build"));
// middleware to read JSON body data

app.use(session(sessionConfig));

//Routes;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    sessionConfig.cookie.secure = true;
    app.set("trust proxy", 1);

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}

app.get("/api/message", async (req, res) => {
    const response = await getMessage(req.query.message);
    res.json(response);
});
// app.post("/api/message", async (req, res) => {
//     // console.log(req.body.message);
//     const message = req.body.message;
//     runSample(message).then((response) => res.json({ message: response }));
//     // res.json({ test: req.body.message });
// });
// app.post("/api/test", (req, res) => {
//     runSample("I am not feeling well");
//     res.json({ test: "test" });
// });

// app.post("/api", (req, res) => {
//     res.json({});
// });
//comment
