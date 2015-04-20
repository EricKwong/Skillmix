"use strict";
module.exports = function(sequelize, DataTypes) {
  var skills = sequelize.define("skills", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,

    timestamps: false,
    
    classMethods: {
      associate: function(models) {
        skills.belongsToMany(models.users, {
          through: "skills_users_know",
          foreignKey: "skill_id",
          as: "SkillKnow"
        });

        skills.belongsToMany(models.users, {
          through: "skills_users_want",
          foreignKey: "skill_id",
          as: "SkillWant"
        });
      }
    }
  });
  return skills;
};