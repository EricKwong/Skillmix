var config  = {
                 "development": {
                   "database": "skillmix_app_development",
                   "host": "127.0.0.1",
                   "dialect": "postgres"
                 }
               },
    models  = require("./models"),
    User    = models.users,
    Skill   = models.skills;

module.exports.User  = User;
module.exports.Skill = Skill;