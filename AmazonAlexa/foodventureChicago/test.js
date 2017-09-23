var http = require('http');

//yelp API stuff
const token='2EWQoZLWHgiKCU9V54nUbUOce2JlUU8YUN0O3H3Ct2MowvHxtDgV3CSezJTge_NYOA3aJ4lePgwAe1Z2VwdukYT3QlqMSUUTMj-knjw7dD8mG23aTjBsYW4jJ1BhWXYx';

const yelp = require('yelp-fusion');
const client = yelp.client(token);

function httpGet(query, callback) {

    const searchRequest = {
	term:query,
	location: 'san francisco, ca'
    };
    
    client.search(searchRequest).then(response => {
	// console.log(response.jsonBody.businesses[0]);
	var restuarnts = response.jsonBody.businesses;
	callback(restuarnts);
    }).catch(e => {
	console.log('error');
	console.log(e);
    });    
}

httpGet('chinese', function (response) {

    console.log(response.name);
    
});

