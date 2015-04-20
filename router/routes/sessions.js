var express    = require("express"),
    session    = require('express-session'),
		bcrypt     = require("bcrypt"),
		bodyParser = require("body-parser"),
		morgan     = require('morgan'),
		models     = require("../../models"),
		router     = express.Router(),
		User 		   = models.users;

router.use(morgan("dev"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
  secret: "everyoneknows",
  saveUninitialized: false,
  resave: false
}));

router.get("/", function(req, res) {
	res.send(req.session);
});

router.post("/", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({
			where: {username: username}
		})
		.then(function(user) {
			if (user) {
				bcrypt.compare(password, user.password_digest, function(err, result) {
					if (result) {
						req.session.currentUser = user.id;
						res.send(user);
					} else {
						res.status(400)
							 .send({
							 	err: 400,
							 	msg: "Incorrect password"
							});
				  }
				});
			} else {
				res.status(400)
					 .send({
							err: 400,
							msg: "Username doesn't exist"
					});
			}
		});
});

router.delete("/", function(req, res) {
	delete req.session.currentUser;
	res.send("Succesfully Logged out");
});

module.exports = router;