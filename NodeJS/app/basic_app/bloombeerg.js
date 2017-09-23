




var parseKey = function(acc){
    console.log("=============Beginning===============");
    var ans = "";
    ans += acc["who"].charAt(0);
    ans += acc["what"].charAt(1);
    ans +=acc["where"].charAt(2);
    ans +=acc["what"].charAt(acc["what"].length-1);
    ans +=acc["what"].charAt(0);
    ans +=acc["where"].charAt(3);
    ans +=acc["where"].charAt(acc["where"].length-2);
    ans +=acc["what"].charAt(0);
    ans +=acc["what"].charAt(acc["what"].length-1);
    ans +=acc["who"].charAt(0);
    ans +=acc["where"].charAt(1);
    ans +=acc["what"].charAt(acc["what"].length-5);
    ans +=acc["who"].charAt(acc["who"].length-1);
    ans +=acc["where"].charAt(2);
    ans +=acc["who"].charAt(2);
    ans +=acc["what"].charAt(2);
    ans +=acc["who"].charAt(acc["who"].length-1);
    ans +=acc["where"].charAt(1);
    ans +=acc["where"].charAt(2);
    ans +=acc["who"].charAt(acc["who"].length-1);
    ans +=acc["what"].charAt(acc["what"].length-4);
    ans +=acc["who"].charAt(3);
    ans +=acc["who"].charAt(acc["who"].length-1);
    ans +=acc["where"].charAt(acc["where"].length-4);
    ans +=acc["what"].charAt(acc["what"].length-3);
    ans +=acc["where"].charAt(1);
    ans +=acc["who"].charAt(2);

    console.log(acc);
    console.log(acc["who"].charAt(0));
    console.log(acc["what"].charAt(1));
    console.log(acc["where"].charAt(2));
    console.log(acc["what"].charAt(acc["what"].length-1));
    console.log(acc["what"].charAt(0));
    console.log(acc["where"].charAt(3));
    console.log(acc["where"].charAt(acc["where"].length-2));
    console.log(acc["what"].charAt(0));
    console.log(acc["what"].charAt(acc["what"].length-1));
    console.log(acc["who"].charAt(0));
    console.log(acc["where"].charAt(1));
    console.log(acc["what"].charAt(acc["what"].length-5));
    console.log(acc["who"].charAt(acc["who"].length-1));
    console.log(acc["where"].charAt(2));
    console.log(acc["who"].charAt(2));
    console.log(acc["what"].charAt(2));
    console.log(acc["who"].charAt(acc["who"].length-1));
    console.log(acc["where"].charAt(1));
    console.log(acc["where"].charAt(2));
    console.log(acc["who"].charAt(acc["who"].length-1));
    console.log(acc["what"].charAt(acc["what"].length-4));
    console.log(acc["who"].charAt(3));
    console.log(acc["who"].charAt(acc["who"].length-1));
    console.log();(acc["where"].charAt(acc["where"].length-4));
    console.log(acc["what"].charAt(acc["what"].length-3));
    console.log(acc["where"].charAt(1));
    console.log(acc["who"].charAt(2));

    console.log(ans);
    console.log("===========Ending===================");
};


var room_one = {"who" : "jason",
                "what" : "escapes",
                "where": "lounge"};

var room_two = {"who": "jason",
                "what": "acid",
                "where": "conservatory"};

var room_three = {"who": "jason",
                  "what": "found",
                  "where": "Study"};

var room_four = {"who": "jason",
                 "what": "statue",
                 "where": "Dining Room"};

var room_five = {"who": "jason",
                 "what": "weapon",
                 "where": "Billiard Room"};

var room_six = {"who": "jason",
                "what": "fork",
                "where": "Kitchen"};

var room_seven = {"who": "jason",
                  "what": "weapon" ,
                  "where": "Hall"};

var room_eight = {"who": "jason",
                  "what": "trap",
                  "where": "Ballroom"};

var room_nine = {"who": "jason",
                 "what": "device",
                 "where": "library"};

var room_ten = {"who": "jason",
                "what": "note",
                "where": "central stairs"};

parseKey(room_one);
parseKey(room_two);
parseKey(room_three);
parseKey(room_four);
parseKey(room_five);
parseKey(room_six);
parseKey(room_seven);
parseKey(room_eight);
parseKey(room_nine);
parseKey(room_ten);

var all_room = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

"reverend green"
"mr.green"
"colonel mustard"
var final = {
    who: "mr.green",
    where: "",
    what: "terminal"
}

parseKey(final);
