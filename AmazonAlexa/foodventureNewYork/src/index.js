var Alexa = require('alexa-sdk');
var http = require('http');

//===============================Yelp Setup========================
const token='2EWQoZLWHgiKCU9V54nUbUOce2JlUU8YUN0O3H3Ct2MowvHxtDgV3CSezJTge_NYOA3aJ4lePgwAe1Z2VwdukYT3QlqMSUUTMj-knjw7dD8mG23aTjBsYW4jJ1BhWXYx';

const yelp = require('yelp-fusion');
const client = yelp.client(token);
//==================================================================

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE'
};

var location = "New York City";


var numberOfResults = 3;

var welcomeMessage = location + " FoodVenture. You can ask me for food recommendations";

var welcomeRepromt = "You can ask me for more information about the food culture in New York City, search for food, or say help.What will it be?";

var locationOverview = "New York lays claim to a large number of food that reflect the city's diverse culture. It lays home cuisine from almost every ethnicity in the world. Some of its local special is the nyc pizza, Coney Island Dog, New York CheeseCake, New York Pastrami, and Black and White Cookie. What else can I tell you?";

var HelpMessage = "Here are some things you  can say: food suggestion. Tell me about " + location + ". search for foods. What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information.";

var tryAgainMessage = "please try again.";

var topFiveMoreInfo = " You can tell me a number for more information. For example open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var noAttractionErrorMessage = "There was an error finding this attraction, " + tryAgainMessage;

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + ' ' + location + " food places, you can read more on your Alexa app. ";

var hearMoreMessage = "What else can I help you with?";

var newline = "\n";

var output = "";

var alexa;

var topFive = [
    { number: "1", caption: "New York Style Pizza", more: "New York-style pizza is a large hand-tossed thin-crust pie. It is often sold in wide slices and it has a signature crisp on its edge and the signature fold in the middle. Di Fara is considered home to one of the best pies in NYC.", location: "1424 Avenue J, Brooklyn, NY 11230", contact: "718 258 1367" },
    { number: "2", caption: "Coney Island Hot Dog", more: "Originating in Coney Island located in brooklyn, this hot dog contains a good mix of savory meat and other toppings. It is from Greek Origin. Coney Island Hot Dogs can be found almost anywhere in New York, but Nathan's Famous is home to one of the best hot dogs in the city.", location: "1310 Surf Ave, Brooklyn, NY 11224", contact: "718 333 2202" },
    { number: "3", caption: "New York Cheesecake", more: "The typical New York cheesecake is rich and has a dense, smooth, and creamy consistency. Sour cream makes the cheesecake more resilient to freezing and is the method by which most frozen cheesecakes are made. However, a lavish variant uses sour cream as a topping, applied when the cheesecake is cooked. It is mixed with vanilla extract and sugar and replaced in the oven, essentially making the cheesecake twice-baked. Junior's has one of the best cheesecakes.", location: "1515 Broadway (45th Street), New York, NY 10019", contact: "212 302 2000" },
    { number: "4", caption: "New York Pastrami", more: "New York pastrami is generally made from the navel end of the brisket. It is cured in brine, coated with a mix of spices such as garlic, coriander, black pepper, paprika, cloves, allspice, and mustard seed, and then smoked. Finally, the meat is steamed until the connective tissues within the meat break down into gelatin. Katz's Delicatessen is home to one of the best pastrami sandwiches", location: "205 E Houston St, New York, NY 10002", contact: "212 254 2246" },
    { number: "5", caption: "Black&White Cookie", more: "This iconic New York snack is literally a black and white cookie,  or half-and-half cookie, is a soft, sponge-cake-like shortbread which is iced on one half with vanilla fondant, and on the other half by chocolate fondant. These can be found at any deli, one place to get them is RUSS & DAUGHTERS", location: "179 E Houston St, New York, NY 10002", contact: "212 475 4880" }
];

var topFiveIntro = "Here are the most famous foods in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
	this.handler.state = states.SEARCHMODE;
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':askWithCard', output, location, locationOverview);
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Things To Eat in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'getNewsIntent': function () {
	var query = this.event.request.intent.slots.food.value;
	
	httpGet(query, function (response) {
	    
	    // Parse the response into a JSON object ready to be formatted.
	    var responseData = response;
	    var cardContent = "Data provided by Yelp\n\n";

	    // Check if we have correct data, If not create an error speech out to try again.
	    if (responseData == null) {
		output = "There was a problem with getting data please try again";
	    }
	    else {
		output = newsIntroMessage;

		// If we have data.
		for (var i = 0; i < responseData.length; i++) {

		    if (i < numberOfResults) {
			// Get the name and description JSON structure.
			var headline = responseData[i].name;
			var location = responseData[i].location.display_address[0];
			var rating = responseData[i].rating; 
			var index = i + 1;

			output += " Restaurant " + index + ": " + headline + ";";

			cardContent += " Restaurant " + index + ".\n";
			cardContent += headline + ".\n Location:" + location + "\n Rating:" + rating + '\n'; 
		    }
		    else
			break;
		}

		output += " See your Alexa app for more information.";
	    }

	    var cardTitle = location + " Food";

	    alexa.emit(':tellWithCard', output, cardTitle, cardContent);
	});
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = this.event.request.intent.slots.attraction.value;
        var index = parseInt(slotValue) - 1;

        var selectedAttraction = topFive[index];
        if (selectedAttraction) {

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },
    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
    console.log("/n QUERY: "+query);

    const searchRequest = {
	term:query,
	location: location
    };
    
    client.search(searchRequest).then(response => {
	// console.log(response.jsonBody.businesses[0]);
	var restuarnts = response.jsonBody.businesses;
	callback(restuarnts);
    }).catch(e => {
	console.log('error:');
	console.log(e);
    });    
}

String.prototype.trunc =
    function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
    };
