App.Views.User = Backbone.View.extend({
	initialize: function() {
		console.log("User View Created");
		this.userTemplate = Handlebars.compile($("#user-template").html());
		this.render();
	},

	tagName: "section",

	className: "user",

	render: function() {
		this.$el.html(this.userTemplate(this.model.toJSON()));
	}
});