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
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "http://moss-side.yoursquaremile.co.uk/img/default-profile-pic.png?dim=96x96"
    }
  }, {
    
    underscored: true,

    timestamps: false,

    instanceMethods: {

      getUserKnowSkill: function() {
        var userSkills = this.UserKnows.map(function(skill) {
          return skill.id;
        });

        return userSkills;
      },

      getUserWantSkill: function() {
        var userSkills = this.UserWants.map(function(skill) {
          return skill.id;
        });

        return userSkills;
      },

      getKnowSkillsUsers: function(currentUserSkills) {
        var newCurrentUserSkills = currentUserSkills.map(function(id) {
          return parseInt(id);
        });
        if (_.intersection(this.getUserKnowSkill(), newCurrentUserSkills).length > 0) {
          return this;
        }
      },

      getWantSkillsUsers: function(currentUserSkills) {
        var newCurrentUserSkills = currentUserSkills.map(function(id) {
          return parseInt(id);
        });
        if (_.intersection(this.getUserWantSkill(), newCurrentUserSkills).length > 0) {
          return this;
        }
      }

    },

    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.skills, {
          through: "skills_users_know",
          foreignKey: "user_id",
          as: "UserKnows"
        });

        users.belongsToMany(models.skills, {
          through: "skills_users_want",
          foreignKey: "user_id",
          as: "UserWants"
        });
      }
    }
  });
  return users;
};