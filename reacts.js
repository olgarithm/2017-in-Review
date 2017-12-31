// Analyzes friends interactions and the number of my likes, loves, laughs, wows, cry, angry reacts!

// Reaction images:
// like - https://www.facebook.com/rsrc.php/v3/yB/r/lDwm6Y_i0v8.png
// love - https://www.facebook.com/rsrc.php/v3/yn/r/Q2ZsBFJIdXg.png
// laugh - https://www.facebook.com/rsrc.php/v3/yX/r/85Fysyalo_E.png
// wow - https://www.facebook.com/rsrc.php/v3/yT/r/fhpn7HuBJXG.png
// cry - https://www.facebook.com/rsrc.php/v3/yk/r/x-r8xo-ZCcu.png
// angry - https://www.facebook.com/rsrc.php/v3/yz/r/XTeRB5Z20Am.png

var cheerio = require('cheerio')
var fs = require('fs')
var data = fs.readFileSync('sample.html', 'utf8'),
$ = cheerio.load(data);
var images = ["https://www.facebook.com/rsrc.php/v3/yB/r/lDwm6Y_i0v8.png", "https://www.facebook.com/rsrc.php/v3/yn/r/Q2ZsBFJIdXg.png", "https://www.facebook.com/rsrc.php/v3/yX/r/85Fysyalo_E.png", "https://www.facebook.com/rsrc.php/v3/yT/r/fhpn7HuBJXG.png", "https://www.facebook.com/rsrc.php/v3/yk/r/x-r8xo-ZCcu.png", "https://www.facebook.com/rsrc.php/v3/yz/r/XTeRB5Z20Am.png"];
var reactions = [0, 0, 0, 0, 0, 0];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var friendsMadePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalFriends = 0;
var friends = new Map();

// Only looks at interactions that happened in 2017
// Searches through the HTML and does three things:
// 		1) Compares the image of the activity to the like/love/laugh/wow/cry/angry images
//			a) If it matches one of the images, increments that index of the reactions array
//		2) Finds all the friends I made and increments that month's index of the friendsMadePerMonth array 
//		3) Gets the name of friends whose content I either commented on or liked/reacted to
//			a) Puts that name into a map: Key -> name, Value -> # of times I've interacted with them
//			b) Sort the map by # of times I've interacted with them
$('div[id="year_2017"]').each(function() {
	$(this).find('div[class="clearfix"]').each(function(i, elem) {
		var stringedHTML = String(($(this).html()));
		for (var j = 0; j < images.length; j++) {
			if (stringedHTML.includes(images[j])) {
				reactions[j]++;
			} 
		}

		// If we find an accepted friend request, we want to increment the
		// friendsMadePerMonth array appropriately
		if (stringedHTML.includes("became friends with")) {
			for (var j = 0; j < months.length; j++) {
				if (stringedHTML.includes(months[j])) {
    				friendsMadePerMonth[j]++;
    				totalFriends++;
    			} 
			}
		}

		// Most activity will be in the form:
		// [YOUR NAME] likes [FRIEND NAME'S] post
		// [YOUR NAME] reacted to [FRIEND NAME'S] post
		// [YOUR NAME] commented on [FRIEND NAME'S] post
		// We extract the friend's name and get rid of the "'s" at the end
		var stringedText = $(this).text();
		var strings = stringedText.split(" ");
		if(stringedText.indexOf("likes") > 0 || stringedText.indexOf("liked") > 0) {
			var friendsName = strings[3] + " " + strings[4].substring(0, strings[4].length - 2);
			if (friends.get(friendsName) != undefined) {
				friends.set(friendsName, friends.get(friendsName) + 1);
			} else {
				friends.set(friendsName, 1);
			}
		} else if(stringedText.indexOf("to") > 0) {
			if (strings[5] != undefined) {
    			var friendsName = strings[4] + " " + strings[5].substring(0, strings[5].length - 2);
    			if (friends.get(friendsName) != undefined) {
    				friends.set(friendsName, friends.get(friendsName) + 1);
    			} else {
    				friends.set(friendsName, 1);
    			}
    		}
		} else if(stringedText.indexOf("on") > 0) {
			if (strings[5] != undefined) {
    			var friendsName = strings[4] + " " + strings[5].substring(0, strings[5].length - 2);
    			if (friends.get(friendsName) != undefined) {
    				friends.set(friendsName, friends.get(friendsName) + 1);
    			} else {
    				friends.set(friendsName, 1);
    			}
    		}
		}
	});

	// Now that we have all the friends I've interacted with, I want to be able to sort them. 
	// So, I make a friend object and put it into an array so that I can sort it by value later.
	var friendsArray = [];
	friends.forEach(function(value, key, map) {
			var friendObject = new Object();
			friendObject.name = key;
			friendObject.value = value;
			friendsArray.push(friendObject);
	});

	friendsArray.sort(function(a,b) {
		return b.value - a.value;
	});

	console.log("Like, love, laugh, wow, cry, angry reactions: " + "[" + reactions + "]");
	console.log("Friends made per month: " + "[" + friendsMadePerMonth + "]");
	console.log("Total friends made in 2017: " + totalFriends);
	console.log("How much you interact with your friends:");
	console.log(friendsArray);
});
