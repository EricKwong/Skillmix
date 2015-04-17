"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {msg: "username must be letters and numbers only"}
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {msg: "First name must be letters only"}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {msg: "Last name must be letters only"}
      }
    },
    location: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: "Invalid email address"}
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};