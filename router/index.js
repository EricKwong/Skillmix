module.exports = function(app) {
	app.use("/sessions", require("./routes/sessions.js"));
	app.use("/users", require("./routes/users.js"));
	app.use("/skills", require("./routes/skills.js"));
	app.use("", require("./routes/upload.js"));
};