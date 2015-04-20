"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password_digest: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("users").done(done);
  }
};