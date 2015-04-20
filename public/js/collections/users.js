App.Collections.Users = Backbone.Collection.extend({
	initialize: function() {
		console.log("Users Collection Created");
	},

	url: "/users",

	model: App.Models.User
});