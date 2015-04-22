var express    = require("express"),
		bcrypt     = require("bcrypt"),
		models     = require("../../models"),
		bodyParser = require("body-parser"),
		morgan     = require("morgan"),
		router     = express.Router(),
		User 		   = models.users,
		Skill      = models.skills;

router.use(morgan("dev"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(req, res) {
	User
		.findAll({
			include: [{
				model: Skill,
				as: "UserKnows"
			},
			{
				model: Skill,
				as: "UserWants"
			}]
		})
		.then(function(users) {
			res.send(users);
		});
});

router.post("/matched", function(req, res) {
	User
		.findAll({
			include: [{
				model: Skill,
				as: "UserKnows"
			},
			{
				model: Skill,
				as: "UserWants"
			}]
		})
		.then(function(users) {
			var knowUsers = [];
			users.forEach(function(user) {
				var userNow = user.getKnowSkillsUsers(req.body.wantSkills);
				if (userNow) {
					knowUsers.push(userNow);
				}
			});
			var matchedUsers = [];
			knowUsers.forEach(function(user) {
				var userNow = user.getWantSkillsUsers(req.body.knowSkills);
				if (userNow) {
					matchedUsers.push(userNow);
				}
			});
			res.send(matchedUsers);
		});
});

router.post("/", function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		delete req.body.password;
		req.body.password_digest = hash;
		User
			.create(req.body)
			.then(function(createdUser) {
				res.send(createdUser);
			},
			function(err) {
				var errors = err.errors.map(function(error) {
					return error.message;
				});

				res.status(422).send({
					status: 422,
					err: errors
				});
			});

	});
});

router.get("/:id", function(req, res) {
	User
		.findOne({
			where: {id: req.params.id},
			include: [{
				model: Skill,
				as: "UserKnows"
			},
			{
				model: Skill,
				as: "UserWants"
			}]
		})
		.then(function(user) {
			res.send(user);
		});
});

router.put("/:id/add_known_skill", function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			Skill
				.findOne(req.body.skill_id)
				.then(function(skill) {
					user.addUserKnow(skill)
					res.send(skill);
				});
		});
});

router.put("/:id/add_wanted_skill", function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			Skill
				.findOne(req.body.skill_id)
				.then(function(skill) {
					user.addUserWant(skill)
					res.send(skill);
				});
		});
});

router.put("/:id/remove_known_skill", function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			Skill
				.findOne(req.body.skill_id)
				.then(function(skill) {
					user.removeUserKnow(skill)
					res.send(skill);
				});
		});
});

router.put("/:id/remove_wanted_skill", function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			Skill
				.findOne(req.body.skill_id)
				.then(function(skill) {
					user.removeUserWant(skill)
					res.send(skill);
				});
		});
});



module.exports = router;
