const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { services_ulr } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
	const event = req.body;

	axios.post(`${services_ulr.service_4000}`, event);
	axios.post(`${services_ulr.service_4001}`, event);
	axios.post(`${services_ulr.service_4002}`, event);

	console.log("Event bus is executed");

	res.send({ Status: "OK" });
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
	console.log(`Server is Listning at port :${PORT}`);
});
