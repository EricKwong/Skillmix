App.Views.LoggedInMain = Backbone.View.extend({
	initialize: function() {
		console.log("Logged In Main View Created");
		this.listenTo(this.collection, "reset", this.render);
	},

	el: "#main-container",

	render: function() {
		this.$el.empty();
		this.collection.each(this.renderOne, this);
	},

	renderOne: function(model) {
		var userView = new App.Views.User({model: model});
		this.$el.append(userView.$el);
	}
});