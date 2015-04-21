"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {msg: "Username must be letters and numbers only"},
        notEmpty: {msg: "Username cannot be empty"}
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password cannot be empty"}
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {msg: "First name must be letters only"}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {msg: "Last name must be letters only"}
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Location cannot be empty"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: "Email address is invalid"}
      }
    }
  }, {
    
    underscored: true,

    timestamps: false,

    instanceMethods: {
      findKnowMatches: function(knownSkills) {
        var matchedUsers = [];
        this.forEach(function(user) {
          user.UserWant.forEach(function(wantSkill) {
            knownSkills.forEach(function(skill) {
              if (wantSkill.id === skill.id) {
                if (matchedUsers.indexOf(user) === -1) {
                  matchedUsers.push(user);
                }
              }
            });
          });
        });

        return matchedUsers;
      },

      sayMyName: function() {
        return this.first_name;
      },

      skills: function() {
        return "stubb";
      },

      findWantMatches: function(wantedSkills) {
        var matchedUsers = [];
        this.forEach(function(user) {
          user.UserKnow.forEach(function(knowSkill) {
            wantedSkills.forEach(function(skill) {
              if (knowSkill.id === skill.id) {
                if (matchedUsers.indexOf(user) === -1) {
                  matchedUsers.push(user);
                }
              }
            });
          });
        });

        return matchedUsers;
      }
    },

    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.skills, {
          through: "skills_users_know",
          foreignKey: "user_id",
          as: "UserKnow"
        });

        users.belongsToMany(models.skills, {
          through: "skills_users_want",
          foreignKey: "user_id",
          as: "UserWant"
        });
      }

      // findMatches: function(knownSkills, wantedSkills) {
      //   console.log(knownSkills)
      //   users.findAll({
      //     include: [{
      //       model: Skill,
      //       as: "UserKnow"
      //     },
      //     {
      //       model: Skill,
      //       as: "UserWant"
      //     }]
      //   }).then(function(users) {
      //     users
      //       .findKnowMatches(knownSkills)
      //       .then(function(knowMatchedUsers) {
      //         knowMatchedUsers
      //           .findWantMatches(wantedSkills)
      //           .then(function(wantedMatchedUsers) {
      //             return wantedMatchedUsers;
      //           });
      //       });
      //   });
      // }
    }
  });
  return users;
};