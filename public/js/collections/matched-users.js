App.Collections.MatchedUsers = Backbone.Collection.extend({
	initialize: function() {
		console.log("New Matched Users Collection created");
	},

	url: "/users/matched",

	model: App.Models.User
});