var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	App.usersCollection = new App.Collections.Users;
	App.matchedUsersCollection = new App.Collections.MatchedUsers;
	App.currentUserModel = new App.Models.CurrentUser;
	App.mainView = new App.Views.Main({collection: App.usersCollection});
	App.loggedInMainView = new App.Views.LoggedInMain({collection: App.matchedUsersCollection});
	App.signUpView = new App.Views.SignUp;
	App.sidebarView = new App.Views.Sidebar({model: App.currentUserModel});
	App.loginView = new App.Views.Login;

	var toggle = 0;
	$("#sidebar-button").on("click", function() {
		if (toggle === 0) {
			$("#sidebar-button").animate({
				left: "260px"
			},700);
			$("#sidebar-container").animate({
				left: "260px"
			}, 700);
			toggle = 1;
		} else {
			$("#sidebar-button").animate({
				left: "0px"
			},700);
			$("#sidebar-container").animate({
				left: "0px"
			}, 700);
			toggle = 0;
		}
	});
});