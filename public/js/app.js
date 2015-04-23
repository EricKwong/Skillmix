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

	var toggle = 1;
	$("#sidebar-button").on("click", function() {
		if (toggle === 0) {
			$("#sidebar-button").animate({
				right: "260px"
			},600);
			$("#sidebar-container").animate({
				right: "0"
			}, 600);
			$("#main-container").animate({
				left: "80px"
			}, 600);
			toggle = 1;
		} else {
			$("#sidebar-button").animate({
				right: "0px"
			},600);
			$("#sidebar-container").animate({
				right: "-260px"
			}, 600);
			$("#main-container").animate({
				left: "210px"
			}, 600);
			toggle = 0;
		}
	});

	App.s3 = function s3_upload(){
		        var status_elem = document.getElementById("status");
		        var s3upload = new S3Upload({
		            file_dom_selector: 'files',
		            s3_sign_put_url: '/sign_s3',
		            onProgress: function(percent, message) {
		                status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
		            },
		            onFinishS3Put: function(public_url) {
		                status_elem.innerHTML = 'Upload completed.'
		                $.get("/sessions").done(function(data) {
		                  $.ajax({
		                    url: "/users/" + data.currentUser.toString(),
		                    method: "PUT",
		                    data: {image: public_url}
		                  });
		                });
		            },
		            onError: function(status) {
		                status_elem.innerHTML = 'Upload error: ' + status;
		            }
		        });
  };

});