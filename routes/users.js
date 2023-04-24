const express = require("express");
const router = express.Router();
const CyclicDB = require("@cyclic.sh/dynamodb");
const db = CyclicDB(process.env.CYCLIC_DB);
let users = db.collection("users");

/* GET users listing. */
router.get("/", async (req, res, next) => {
	let item = await users.list();
	res.send(item);
});

router.get("/:key", async (req, res, next) => {
	let item = await users.get(req.params.key);
	res.send(item);
});

router.post("/", async (req, res, next) => {
	const { email, firstName, lastName, age } = req.body;
	await users.set(email, {
		firstName: firstName,
		secondName: lastName,
		age: age,
	});
	res.end();
});

router.put("/", async (req, res, next) => {
	const { email, firstName, lastName, age } = req.body;
	await users.set(email, {
		firstName: firstName,
		secondName: lastName,
		age: age,
	});
	res.end();
});

router.delete("/:key", async (req, res, next) => {
	await users.delete(req.params.key);
	res.end();
});

module.exports = router;
