"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("skills_users_want", {
    	user_id: {
    		type: DataTypes.INTEGER
    	},
    	skill_id: {
    		type: DataTypes.INTEGER
    	}
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("skills_users_want").done(done);
  }
};
