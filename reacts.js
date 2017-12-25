// analyzing each of my likes, loves, laughs, wows, cry, angry reacts!
// we only want to look inside of <div id="year_2017">

// like - https://www.facebook.com/rsrc.php/v3/yB/r/lDwm6Y_i0v8.png
// love - https://www.facebook.com/rsrc.php/v3/yn/r/Q2ZsBFJIdXg.png
// laugh - https://www.facebook.com/rsrc.php/v3/yX/r/85Fysyalo_E.png
// wow - https://www.facebook.com/rsrc.php/v3/yT/r/fhpn7HuBJXG.png
// cry - https://www.facebook.com/rsrc.php/v3/yk/r/x-r8xo-ZCcu.png
// angry - https://www.facebook.com/rsrc.php/v3/yz/r/XTeRB5Z20Am.png

var cheerio = require('cheerio'),
    fs = require('fs'),
    data = fs.readFileSync('sample.html', 'utf8'),
    $ = cheerio.load(data);
    var images = ["https://www.facebook.com/rsrc.php/v3/yB/r/lDwm6Y_i0v8.png", "https://www.facebook.com/rsrc.php/v3/yn/r/Q2ZsBFJIdXg.png", "https://www.facebook.com/rsrc.php/v3/yX/r/85Fysyalo_E.png", "https://www.facebook.com/rsrc.php/v3/yT/r/fhpn7HuBJXG.png", "https://www.facebook.com/rsrc.php/v3/yk/r/x-r8xo-ZCcu.png", "https://www.facebook.com/rsrc.php/v3/yz/r/XTeRB5Z20Am.png"];
    $('div[id="year_2017"]').each(function() {
    	var reactions = [0, 0, 0, 0, 0, 0];
    	var friends = new Map();
    	var friendsMade = 0;
    	$(this).find('div[class="clearfix"]').each(function(i, elem) {
    		var stringedHTML = String(($(this).html()));
    		for (var j = 0; j < images.length; j++) {
    			if (stringedHTML.includes(images[j])) {
    				reactions[j]++;
    			} 
    		}
    		if (stringedHTML.includes("became friends with")) {
    			friendsMade++;
    		}

    		// after "on" "to" "likes"

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

    		//console.log(stringedText);
    		//console.log($(this).html());
    		console.log();
    		console.log();
    	});
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

    	console.log(reactions);
    	console.log(friendsMade);
    	console.log(friendsArray);
    });
  