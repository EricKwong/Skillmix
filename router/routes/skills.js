var express    = require("express"),
		models     = require("../../models"),
		bodyParser = require("body-parser"),
		morgan     = require('morgan'),
		router     = express.Router(),
		Skill 		 = models.skills;

router.use(morgan("dev"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(req, res) {

});

router.post("/", function(req, res) {
	Skill
		.findOrCreate({
			where: {name: req.body.name}
		})
		.then(function(skill) {
			res.send(skill);
		});
});

module.exports = router;
