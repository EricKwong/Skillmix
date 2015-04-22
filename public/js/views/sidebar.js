App.Views.Sidebar = Backbone.View.extend({
	initialize: function() {
		console.log("Sidebar View Created");
		this.sidebarTemplate = Handlebars.compile($("#sidebar-template").html());
		this.listenTo(this.model, "sync", this.render);
	},

	el: "#profile-container",

	events: {
		"keypress #add-known-skills" : "addKnownSkill",
		"keypress #add-wanted-skills" : "addWantedSkill",
		"click .delete-know-skill" : "removeKnowSkill",
		"click .delete-want-skill" : "removeWantSkill"
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
	},

	removeKnowSkill: function(event) {
		var clickedSkillId = $(event.currentTarget).data("skill-id");
		$.ajax({
			url: App.currentUserModel.url + "/remove_known_skill",
			method: "PUT",
			data: {skill_id: clickedSkillId}
		}).done(function() {
			App.currentUserModel.fetch();
			App.matchedUsersCollection.fetch({reset: true});
		});
	},

	removeWantSkill: function(event) {
		var clickedSkillId = $(event.currentTarget).data("skill-id");
		$.ajax({
			url: App.currentUserModel.url + "/remove_wanted_skill",
			method: "PUT",
			data: {skill_id: clickedSkillId}
		}).done(function() {
			App.currentUserModel.fetch();
			App.matchedUsersCollection.fetch({reset: true});
		});
	}

});