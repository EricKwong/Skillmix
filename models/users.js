 var _ = require('underscore');

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

      getUserKnowSkill: function() {
        var userSkills = this.UserKnow.map(function(skill) {
          return skill.id;
        });

        return userSkills;
      },

      getUserWantSkill: function() {
        var userSkills = this.UserWant.map(function(skill) {
          return skill.id;
        });

        return userSkills;
      },

      getKnowSkillsUsers: function(currentUserSkills) {
        if (_.intersection(this.getUserKnowSkill, currentUserSkills).length > 0) {
          return this;
        }
      },

      getWantSkillsUsers: function(currentUserSkills) {
        if (_.intersection(this.getUserWantSkill, currentUserSkills).length > 0) {
          return this;
        }
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