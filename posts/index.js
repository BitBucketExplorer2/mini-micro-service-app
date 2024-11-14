const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { services_url } = require("./config");
const { default: axios } = require("axios");
const { type } = require("../app-code/Enums");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/post", async (req, res) => {
	const id = randomBytes(4).toString("hex");
	const { title, description, author } = { ...req.body, author: "John" };

	posts[id] = { id, title, description, author };
	await axios.post(services_url.event_service, {
		type: type.PostCreated,
		data: { id, title, description, author },
	});
	res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
	console.log("Event Recieved :", req.body.type);
	res.send({});
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Posts service is listing as port ${PORT} `);
});
