const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { type: eventType } = require("../app-code/Enums");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	if (type == eventType.PostCreated) {
		const { id, title, description, author } = data;
		posts[id] = {
			id,
			title,
			description,
			author,
			comments: [],
		};
	}
	if (type == eventType.CommentCreated) {
		const { id, content, postId } = data;
		const post = posts[postId];
		post.comments.push({ id, content });
	}
	console.log(posts);
	res.send({});
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
	console.log(`query service is listning on port : ${PORT}`);
});
