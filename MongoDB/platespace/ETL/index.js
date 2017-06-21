var axios = require('axios');
var flatten = require('lodash.flatten');
var mongoose = require('mongoose');
var config = require('./config');

axios.defaults.headers.common['Authorization'] = config.YELP_AUTH_TOKEN;

var i = 0;
const openingHours = [{ start: "0800", end: "2200" }, { start: "0900", end: "2300" }, { start: "1000", end: "2400" }];

function createPlateSpace(data) {
  i++;

console.log("Lon: " + data.coordinates.longitude)
console.log("Lat: " + data.coordinates.latitude)

  return {
    name: data.name,
    address: data.location.display_address,
    phone: data.display_phone,
    image_url: data.image_url,
    website: data.url,
    attributes: { hasWifi: i % 2 === 0, hasParking: i % 2 !== 0, openOnWeekends: i % 2 === 0, veganFriendly: i % 2 !== 0 },
    location: { type: "Point", coordinates: [data.coordinates.longitude, data.coordinates.latitude] },
    openingHours: openingHours[i % 3],
    averageRating: 0,
    numberOfRates: 0
  };
};

function getData(offset) {
  return axios.get(`${config.YELP_RESTAURANTS_REQ}&offset=${offset}`)
}

var restSchema = mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  image_url: String,
  website: String,
  attributes: Object,
  location: Object,
  openingHours: Object,
  averageRating: Number,
  numberOfRates: Number
});

var offset = 0;
var promises = [];

while (offset < 1000) {
  promises.push(getData(offset));
  offset += 50;
}

Promise.all(promises).then(response => {
  const restaurants = flatten(response.map(item => item.data.businesses)).map(createPlateSpace);
  mongoose.connect(config.MONGODB_ATLAS_URI);
  var db = mongoose.connection;
  db.once('open', () => {
    var Restaurant = mongoose.model('Restaurant', restSchema);
    Restaurant.insertMany(restaurants.map(r => new Restaurant(r))).then(() => db.close()).catch((err) => console.log(err));
  });
}).catch(err => console.log(err));