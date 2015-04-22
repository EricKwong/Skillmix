App.Views.SignUp = Backbone.View.extend({

	initialize: function() {
		console.log("Signup view created");
		this.signUpTemplate = Handlebars.compile($("#signup-template").html());
	},

	el: "#signup-form",

	events: {
		"click #signup-button" : "createUser"
	},

	render: function() {
		this.$el.html(this.signUpTemplate);
	},

	createUser: function() {
		var firstName       = this.$("#signup-firstname").val(),
				lastName        = this.$("#signup-lastname").val(),
				location        = this.$("#signup-location").val(),
				email           = this.$("#signup-email").val(),
				username        = this.$("#signup-username").val(),
				password        = this.$("#signup-password").val(),
				confirmPassword = this.$("#signup-confirm-password").val();

		var userData = {
			first_name: firstName,
			last_name: lastName,
			location: location,
			email: email,
			username: username,
			password: password
		};

		if (password === confirmPassword) {
			if (password.length < 8 || password.length > 20) {
				$('#signup-errors').empty();
				$("<li class='signup-error'>").text("Password length must be between 8-20 characters").appendTo("#signup-errors");
			} else {
				$.post("/users", userData)
					.fail(function(err) {
						var errors = "";
						err.responseJSON.err.forEach(function(error) {
							errors += "<li class='signup-error'>" + error + "</li>";
						});
						$("#signup-errors").html(errors);
					})
					.done(function() {
						$('#signup-errors').empty();
						$("#signup-form input").val("");
					});
			}
		} else {
			alert("Password confirmation doesn't match");
		}
	}

});