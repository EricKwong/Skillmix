var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	App.usersCollection = new App.Collections.Users;
	App.currentUserModel = new App.Models.CurrentUser;
	App.mainView = new App.Views.Main({collection: App.usersCollection});
	App.usersCollection.fetch();
	App.signUpView = new App.Views.SignUp;
	App.sidebarView = new App.Views.Sidebar({model: App.currentUserModel});
	App.loginView = new App.Views.Login;
});