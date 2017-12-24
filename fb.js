(function () {
	var $ = function(id) { return document.getElementById(id); };

	window.onload = function() {
		var accessToken;
		FB.getLoginStatus(function(response) {
			console.log("we getting login status");
	  		if (response.status === 'connected') {
	    		accessToken = response.authResponse.accessToken;
	    		console.log(accessToken);
	  		} 
		});
		console.log(accessToken);
		FB.api('/me/friends', { access_token: response.session.access_token }, function(data){
    		// Some Code Here.
		});

		FB.api(
    		"/post-id",
    		function (response) {
      			if (response && !response.error) {
      				if (response.message.contains("friends")) {
      					console.log(response.message);
      				}
      			}
    		}
		);
	}
}());

