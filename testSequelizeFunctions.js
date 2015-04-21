var models = require('./loadSequelize.js'),
    User   = models.User,
    Skill  = models.Skill;

User.findAll({
  include: [{
    model: Skill,
    as: "UserKnow"
  },
  {
    model: Skill,
    as: "UserWant"
  }]
})
.then(function(users) {
  console.log(users[0].dataValues);
});

// get the current user
// var skillsCurrentWants = ... (get the list of ids for the skills that the current user wants)
// var skillsCurrentKnows = ... (get the list of ids for the skills that the current user knows)