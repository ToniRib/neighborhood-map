# Neighborhood Map Project
## Udacity's Front End Web Development Nanodegree (Project #5)

### Overview
This project uses JavaScript, jQuery, knockoutJS, Google Maps API, and the Yelp API to create a map of the breweries I have visited in Denver, CO.

Note: You can find a live version of this site at [http://tonirib.github.io/neighborhood-map/dist/index.html](http://tonirib.github.io/neighborhood-map/dist/index.html). This site uses the production code created from the Grunt tasks.

#### Dependencies

This project requires Grunt in order to run the Gruntfile. Additionally, bower and the oauth-signature package are used.

#### Locations

All source (dev) code is located in the src directory, while production code generated using Grunt is located in the dist directory.

#### License

All code is provided under the MIT license.

### Using the app

#### Using the list & search feature

Users can filter the list of breweries based on either brewery name or Denver/Aurora neighborhood. The neighborhood names can be seen in blue when the user clicks on a brewery marker. When searching, you can either click the 'search' button or hit enter and both the brewery list and the markers will be filtered according to the search criteria.

#### Linking to Yelp

Each brewery marker is also linked to its Yelp page, so if you can on a marker you can optionally click on the word 'yelp' near the Yelp rating to be taken to its page.

### Running Grunt to Produce Production Files

This section assumes the user is working on MAC OS X.

1. Using the terminal, clone the project into a local respository using Git and ensure you are in the main project location.
2. If you are only interested in generating the production code, simply run the command 'grunt' to run all optimizations in the Gruntfile. Production code will be saved in the dist directory.
4. To view the pages from the production code, navigate to the dist directory and open index.html in your browser.