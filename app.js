var cheerio = require('cheerio'),
    fs = require('fs'),
    data = fs.readFileSync('sample.html', 'utf8'),
    $ = cheerio.load(data),
    friend,
    friends = {},
    ranking = [];


// we only want to look inside of <div id="year_2017">
// This class may change
$('._42ef').each(function() {
    var links = $(this).find('a'),
        name;

    if (links.length > 1 && links[1].attribs.class === 'profileLink') {
        name = links[1].children[0].data;
        friends[ name ] = friends[ name ] || {};
        friends[ name ].likes = friends[ name ].likes || 0;
        friends[ name ].likes++;
        //friends[ name ].comments = friends[ name ].comments || 0;
        //friends[ name ].comments++;
        //friends[ name ].loves = friends[ name ].loves || 0;
        //friends[ name ].loves++;
    }
});

for (friend in friends) {
    if (!friends.hasOwnProperty(friend)) continue;
    ranking.push({
        name:friend, 
        likes: friends[friend].likes
        //comments: friends[friend].comments;
        //loves: friends[friend].loves
    })
}

// will put the top entries at the bottom (easier to read when printing on console)
ranking.sort(function(a,b) {
    return a.likes - b.likes;
});

var likeCount = 0;
var commentCount = 0;
//var loveCount = 0;
for (var ii = 0; ii < ranking.length; ii++) {
    likeCount += ranking[ii].likes;
   // commentCount += ranking[ii].comments;
    //loveCount += ranking[ii].loves;
}

for(i = 0; i < ranking.length; i++) {
    console.log(ranking[i]);
}
console.log('total likes: '+likeCount);
//console.log('total comments: '+commentCount);