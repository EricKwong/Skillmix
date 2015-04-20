module.exports = function(app) {
	app.use("/users", require("./routes/users.js"));
	app.use("/skills", require("./routes/skills.js"));
	app.use("/sessions", require("./routes/sessions.js"));
};