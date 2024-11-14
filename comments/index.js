const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const { services_url } = require("./config");
const { type } = require("../app-code/Enums");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
	const postId = req.params.id;
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;
	const comments = commentsByPostId[postId] || [];
	comments.push({ id: commentId, content });
	commentsByPostId[postId] = comments;
	await axios.post(services_url.event_service, {
		type: type.CommentCreated,
		data: {
			id: commentId,
			postId: postId,
			content: content,
		},
	});
	res.status(201).json(comments);
});

app.post("/events", (req, res) => {
	console.log("Event Recieved :", req.body.type);
	res.send({});
});
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
	console.log(`comments server is running on the port - ${PORT}`);
});
