App.Views.Sidebar = Backbone.View.extend({
	initialize: function() {
		console.log("Sidebar View Created");
		this.sidebarTemplate = Handlebars.compile($("#sidebar-template").html());
		this.listenTo(this.model, "sync", this.render);
	},

	el: "#sidebar-container",

	events: {
		"keypress #add-known-skills" : "addKnownSkill",
		"keypress #add-wanted-skills" : "addWantedSkill"
	},

	render: function() {
		this.$el.html(this.sidebarTemplate(this.model.toJSON()));
	},

	addKnownSkill: function(event) {
		if (event.which === 13 || event.keyCode === 13) {
			var skillInput = this.$("#add-known-skills").val();
			$.post("/skills", {name: skillInput})
				.done(function(skill) {
					$.ajax({
						url: App.currentUserModel.url + "/add_known_skill",
						method: "PUT",
						data: {skill_id: skill[0].id}
					}).done(function() {
						$("#add-known-skills").val("");
						App.currentUserModel.fetch();
					});
				});
		}
	},

	addWantedSkill: function(event) {
		if (event.which === 13 || event.keyCode === 13) {
			var skillInput = this.$("#add-wanted-skills").val();
			$.post("/skills", {name: skillInput})
				.done(function(skill) {
					$.ajax({
						url: App.currentUserModel.url + "/add_wanted_skill",
						method: "PUT",
						data: {skill_id: skill[0].id}
					}).done(function() {
						$("#add-wanted-skills").val("");
						App.currentUserModel.fetch();
					});
				});
		}
	}

});