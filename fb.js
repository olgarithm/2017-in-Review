(function () {
	var $ = function(id) { return document.getElementById(id); };

	window.onload = function() {
		createCharts();
		attachEmotions();
	}

	// Creates the three charts that are displayed using charts.js
	function createCharts() {
		// Type of Listing bar chart
		var first = $("firstChart");
		var myChart = new Chart(first, {
		    type: 'line',
		    data: {
		        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		        datasets: [{
		            label: '# of friends made',
		            data: [8, 11, 7, 13, 13, 23, 26, 9, 16, 14, 1, 6],
		            pointBackgroundColor: [
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		                'rgba(54, 100, 235, 1)',
		                'rgba(54, 162, 256, 1)',
		            ],
		            borderColor: 'rgba(0, 0, 0, 1)',
		            backgroundColor: 'rgba(0, 0, 0, 0)'
		        }]
		    },
		    options: {
		    	responsive: false,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		            xAxes: [{
	        			beginAtZero: true,
	        			ticks: {
				            stepSize: 1,
				            min: 0,
				            autoSkip: false
			        	}	
		    		}],
		        },
		        legend: {
		            display: false
		        }
		    }
		});
		var second = $("secondChart");
		var myDoughnutChart = new Chart(second, {
    		type: "doughnut",
   			data: {
   				labels: ["Like", "Love", "Laugh", "Cry", "Wow", "Angry"],
		        datasets: [{
		            data: [2575, 395, 356, 130, 101, 11],
		            backgroundColor: [
		            	"rgba(54, 162, 235, 1)",
		                "rgba(255, 99, 132, 1)",
		                "rgba(255, 206, 86, 1)",
		                "rgba(75, 192, 192, 1)",
		                "rgba(199, 111, 247, 1)",
		                "rgba(0, 0, 0, 1)",
		            ],
		            borderWidth: 1
		        }]
   			},
    		options: {
		    	responsive: false,
		    }
		});
		var third = $("thirdChart");
		var myBarChart = new Chart(third, {
    		type: "bar",
   			data: {
   				labels: ["Wholesome Memes", "Christine Betts", "Natalie Andreeva", "Dan Radion", "Shanti Camper Singh", "Patty Popp"],
		        datasets: [{
		            data: [156, 115, 84, 75, 72, 58],
		            backgroundColor: [
		            	"rgba(54, 162, 235, 1)",
		                "rgba(255, 99, 132, 1)",
		                "rgba(255, 206, 86, 1)",
		                "rgba(75, 192, 192, 1)",
		                "rgba(199, 111, 247, 1)",
		                "rgba(252, 141, 233, 1)",
		            ],
		            borderWidth: 1
		        }]
   			},
    		options: {
		    	responsive: false,
		    	legend: {
		            display: false
		        },
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }],
		            xAxes: [{
	        			beginAtZero: true,
	        			ticks: {
				            stepSize: 1,
				            min: 0,
				            autoSkip: false
			        	}	
		    		}],
		        }
		    }
		});

	}

	function attachEmotions() {
		var allReactions = new Array("like", "love", "laugh", "wow", "cry", "angry");
		for (var i = 0; i < allReactions.length; i++) {
			var myDiv = document.createElement('div');
			$(allReactions[i]).onmouseover = function(){
				myDiv.innerHTML = getReaction(allReactions[i]);
				myDiv.setAttribute("id", allReactions[i] + "Reaction");
				$("reaction").appendChild(myDiv);
			}
			$(allReactions[i]).onmouseout = function() {
				$("reaction").removeChild($("reaction").childNodes[0]);
			}
		}
	}

	function getReaction(type) {
		console.log(type);
		if (type === "like") {
			console.log("yas like");
			return "YAS LIKE";
		}
	}

	fbAsyncInit = function(){
  	FB.init({
    	appId: 'yourAppIdHere',
    	version: 'v2.5'
  	});
  	FB.getLoginStatus(function(response){
    	if(response.status === 'connected'){
	     	FB.api('me/friends', function(a){
	        	for(var i=0,l=a.length; i<l; i++){
	          		/* make a call for each friend with more .api calls - a is array of User objects - props seen here https://developers.facebook.com/docs/graph-api/reference/user/ */
	          		FB.api(a[i].id, function(r){
	        		});
	        	}
      		});
  		} else {
      		location = 'https://www.facebook.com/dialog/oauth?client_id=replaceThisWithAppId&redirect_uri='+location;
      		// change out replaceThisWithAppId above
    	}
  	});
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
		// to get all the posts I've done since Jan 1st, 2017
		//me/posts?limit=55&since=1483257601
		// to get the reactions from a post
		//POST_ID?fields=reactions.type(LIKE).summary(total_count).limit(0).as(like),reactions.type(LOVE).summary(total_count).limit(0).as(love),reactions.type(WOW).summary(total_count).limit(0).as(wow),reactions.type(HAHA).summary(total_count).limit(0).as(haha),reactions.type(SAD).summary(total_count).limit(0).as(sad),reactions.type(ANGRY).summary(total_count).limit(0).as(angry)
		
	}
}());

