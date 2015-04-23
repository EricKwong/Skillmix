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
		this.loads3();
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
	},

	loads3: function() {
		(function() {

		  window.S3Upload = (function() {

		    $.get("/sessions").done(function(data) {
		      var currentUser = data.currentUser.toString();
		      S3Upload.prototype.s3_object_name = currentUser;
		    });

		    S3Upload.prototype.s3_sign_put_url = '/signS3put';

		    S3Upload.prototype.file_dom_selector = 'file_upload';

		    S3Upload.prototype.onFinishS3Put = function(public_url) {
		      return console.log('base.onFinishS3Put()', public_url);
		    };

		    S3Upload.prototype.onProgress = function(percent, status) {
		      return console.log('base.onProgress()', percent, status);
		    };

		    S3Upload.prototype.onError = function(status) {
		      return console.log('base.onError()', status);
		    };

		    function S3Upload(options) {
		      if (options == null) options = {};
		      for (option in options) {
		        this[option] = options[option];
		      }
		      this.handleFileSelect(document.getElementById(this.file_dom_selector));
		    }

		    S3Upload.prototype.handleFileSelect = function(file_element) {
		      var f, files, output, _i, _len, _results;
		      this.onProgress(0, 'Upload started.');
		      files = file_element.files;
		      output = [];
		      _results = [];
		      for (_i = 0, _len = files.length; _i < _len; _i++) {
		        f = files[_i];
		        _results.push(this.uploadFile(f));
		      }
		      return _results;
		    };

		    S3Upload.prototype.createCORSRequest = function(method, url) {
		      var xhr;
		      xhr = new XMLHttpRequest();
		      if (xhr.withCredentials != null) {
		        xhr.open(method, url, true);
		      } else if (typeof XDomainRequest !== "undefined") {
		        xhr = new XDomainRequest();
		        xhr.open(method, url);
		      } else {
		        xhr = null;
		      }
		      return xhr;
		    };

		    S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
		      var this_s3upload, xhr;
		      this_s3upload = this;
		      xhr = new XMLHttpRequest();
		      xhr.open('GET', this.s3_sign_put_url + '?s3_object_type=' + file.type + '&s3_object_name=' + this.s3_object_name, true);
		      xhr.overrideMimeType('text/plain; charset=x-user-defined');
		      xhr.onreadystatechange = function(e) {
		        var result;
		        if (this.readyState === 4 && this.status === 200) {
		          try {
		            result = JSON.parse(this.responseText);
		          } catch (error) {
		            this_s3upload.onError('Signing server returned some ugly/empty JSON: "' + this.responseText + '"');
		            return false;
		          }
		          return callback(result.signed_request, result.url);
		        } else if (this.readyState === 4 && this.status !== 200) {
		          return this_s3upload.onError('Could not contact request signing server. Status = ' + this.status);
		        }
		      };
		      return xhr.send();
		    };

		    S3Upload.prototype.uploadToS3 = function(file, url, public_url) {
		      var this_s3upload, xhr;
		      this_s3upload = this;
		      xhr = this.createCORSRequest('PUT', url);
		      if (!xhr) {
		        this.onError('CORS not supported');
		      } else {
		        xhr.onload = function() {
		          if (xhr.status === 200) {
		            this_s3upload.onProgress(100, 'Upload completed.');
		            return this_s3upload.onFinishS3Put(public_url);
		          } else {
		            return this_s3upload.onError('Upload error: ' + xhr.status);
		          }
		        };
		        xhr.onerror = function() {
		          return this_s3upload.onError('XHR error.');
		        };
		        xhr.upload.onprogress = function(e) {
		          var percentLoaded;
		          if (e.lengthComputable) {
		            percentLoaded = Math.round((e.loaded / e.total) * 100);
		            return this_s3upload.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
		          }
		        };
		      }
		      xhr.setRequestHeader('Content-Type', file.type);
		      xhr.setRequestHeader('x-amz-acl', 'public-read');
		      return xhr.send(file);
		    };

		    S3Upload.prototype.uploadFile = function(file) {
		      var this_s3upload;
		      this_s3upload = this;
		      return this.executeOnSignedUrl(file, function(signedURL, publicURL) {
		        return this_s3upload.uploadToS3(file, signedURL, publicURL);
		      });
		    };

		    return S3Upload;

		  })();

		}).call(this);
	}

});