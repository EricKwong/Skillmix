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
    }
  });
  return users;
};