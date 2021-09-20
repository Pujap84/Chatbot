process.env.NODE_ENV === "production" || require("dotenv").config();
const path = require("path");
const express = require("express");
let app = express();
const PORT = 3001;
let getMessage = require("./chatbot.js");

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
app.use(express.static("./client/build"));
// middleware to read JSON body data
app.use(express.json());

//Routes;
app.get("/api/message", async (req, res) => {
    const response = await getMessage(req.query.message);
    res.json(response);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}

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
