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

var location = "Chicago";


var numberOfResults = 3;

var welcomeMessage = location + " FoodVenture. You can ask me for food recommendations";

var welcomeRepromt = "You can ask me for more information about the food culture in Chicago, search for food, or say help.What will it be?";

var locationOverview = "Chicago lays claim to a large number of regional specialties that reflect the city's ethnic and working-class roots. The most popular Chicago styled foods are deep dish, chicago dog, italian beef, burgers, and craft brewery. What else can I tell you?";

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
    { number: "1", caption: "DeepDish Pizza", more: "Chicago-style pizza is deep-dish pizza with a tall outer crust and large amounts of cheese, with chunky tomato sauce on top of the cheese instead of underneath it.[5][6] Similar to this is stuffed pizza, with even more cheese, topped with a second, thinner crust. Chicagoans regard Lou Malnati's as the best place to get deep dish.", location: "6649 North Lincoln Avenue, Lincolnwood, IL 60712", contact: "https://www.loumalnatis.com" },
    { number: "2", caption: "Chicago Dog", more: "The Chicago-style hot dog, traditionally a steamed or boiled, natural-casing all-beef wiener on a poppy-seed bun, topped with yellow mustard, chopped onion, sliced tomato, neon-green sweet-pickle relish, sport peppers, a dill-pickle spear, and a sprinkling of celery salt—but never ketchup. There are many places to get this hot dog, one of the best is Superdawg", location: "6363 N Milwaukee Ave, Chicago, IL 60646", contact: "773-763-0660" },
    { number: "3", caption: "Italian Beef", more: "The Italian beef, a sandwich featuring thinly sliced roast beef simmered in a broth (known locally as 'gravy') containing Italian-style seasonings and served on an Italian roll soaked in the meat juices. Most beef stands offer a 'cheesy beef' option, which is typically the addition of a slice of provolone or mozzarella. Go to Portillio's for your beef", location: "100 W Ontario St, Chicago, IL 60610", contact: "312 587-8910" },
    { number: "4", caption: "Burger", more: "Chicago is home to some of the most iconic burger places. From giant behemoths to burgers crafted with the finest premium ingredients, there's lots of mouthwatering variety to go around. The city's longtime favorites are always standouts that everyone can agree on. One of them is Au Cheval.", location: "800 W Randolph St, Chicago, IL 60607", contact: "312 929 4580" },
    { number: "5", caption: "Craft Brewery", more: "Chicago has a long brewing history that dates back to the early days of the city.[56] While its era of mass-scale commercial breweries largely came to an end with Prohibition, the city today boasts a number of microbreweries and brewpubs. For this check out, Goose Island", location: "1800 W Fulton St, Chicago, IL 60612", contact: "800 466 7363" }
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
