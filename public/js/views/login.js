App.Views.Login = Backbone.View.extend({

	initialize: function() {
		console.log("Login View Created");
		this.loginTemplate = Handlebars.compile($("#login-template").html());
		this.logoutTemplate = Handlebars.compile($("#logout-template").html());
		this.render();
	},

	el: "#login-container",

	events: {
		"click #login-button" : "userLogin",
		"click #logout-button" : "userLogout"
	},

	render: function() {
		var thisView = this;
		$.get("/sessions").done(function(response) {
			if (response.currentUser) {
				App.signUpView.$el.empty();
				$('#signup-errors').empty();
				thisView.currentUser = response.currentUser;
				thisView.renderLogout();
				App.sidebarView.model.url = "/users/" + response.currentUser;
				App.sidebarView.model.fetch();
				$.get("/users/" + response.currentUser)
					.done(function(user) {
						var currentUserKnow = user.UserKnows.map(function(skill) {
							return skill.id;
						});

						var currentUserWant = user.UserWants.map(function(skill) {
							return skill.id;
						});
						
						App.matchedUsersCollection.fetch({
							data: {knowSkills: currentUserKnow, wantSkills: currentUserWant},
							processData: true,
							type: "POST",
							reset: true
						});
					});
					$("#sidebar-button").text("Profile");
			} else {
				App.sidebarView.$el.empty();
				App.signUpView.render();
				$('#signup-errors').empty();
				thisView.renderLogin();
				App.usersCollection.fetch();
				$("#sidebar-button").text("Sign Up");
			}
		});
	},

	renderLogin: function() {
		this.$el.html(this.loginTemplate);
	},

	renderLogout: function() {
		var thisView = this;
		$.get("/users/" + this.currentUser)
			.done(function(user) {
				thisView.$el.html(thisView.logoutTemplate(user));
			});
	},

	userLogin: function() {
		var thisView = this;

		var username = this.$("#login-username").val(),
				password = this.$("#login-password").val();

		var loginData = {
			username: username,
			password: password
		};

		$.post("/sessions", loginData)
			.fail(function(err) {
				alert(err.responseJSON.msg);
			})
			.done(function(currentUser) {
				thisView.currentUser = currentUser.id;
				thisView.render();
			});
	},

	userLogout: function() {
		var thisView = this;
		$.ajax({
			url: "/sessions",
			method: "DELETE"
		}).done(function() {
			thisView.render();
		});
	}

});