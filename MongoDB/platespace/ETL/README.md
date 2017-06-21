# Yelp Import Tool

The purpose of this script is to load restaurant data into a MongoDB Atlas database using the Yelp Fusion API.

Getting Started:

  1. Clone/download repository
  1. Create a MongoDB Atlas cluster
  1. Register yelp as a developer for getting an auth token.
  1. Edit 'config.js' file:
    - `MONGODB_ATLAS_URI`: here you need to put your mongoDB connection string.
    - `YELP_AUTH_TOKEN`: here you need to put your auth token from Yelp.
  1. Install yarn using this link: https://yarnpkg.com/lang/en/docs/install/
  1. Install the following packages using yarn: `yarn`
  1. Run command `node index.js`

The script creates new collection for restaurants, using Yelp Fusion API.

Collection schema:
    ```{
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
    }
    ```

Please notice that 'attributes' and 'openingHours' fields, are not taken from Yelp and generate fake data.

In order to delete the collection, please run the following line:

- `node clearRestCollection.js`