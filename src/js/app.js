// Initialize the map
var map;

// Initialize the default infoWindow
var infoWindow = new google.maps.InfoWindow({
  // default content
  content: '<div><h4 id="brewery-name"></h4><p id="brewery-address"></p><p id="yelp"></p></div>'
});

// Set up the ViewModel
var ViewModel = function() {
  'use strict';

  var self = this;
  self.breweryList = ko.observableArray([]);
  self.filteredBreweryList = ko.observableArray([]);

  // Create the google map zoomed in on Denver
  self.initialize = function() {
    var mapCanvas = document.getElementById('google-map');
    var cenLatLng = new google.maps.LatLng(39.711502, -104.920702);
    var mapOptions = {
      center: cenLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
  };

  // Create the list of brewery locations from the model
  self.buildBreweryLocations = function() {
    breweryLocations.forEach(function(brewItem) {
      self.breweryList.push( new Brewery(brewItem) );
    });
  };

  // Set up an event listener for clicks for each brewery
  self.setBreweryClickFunctions = function() {
    self.breweryList().forEach(function(brewery) {
      google.maps.event.addListener(brewery.marker(), 'click', function() {
        self.breweryClick(brewery);
      });
    });
  };

  // Function to handle clicking on a brewery (either in list or marker)
  self.breweryClick = function(brewery) {
    // Set the content of the infoWindow
    var infoContent = '<div><h4 id="brewery-name">' + brewery.name() + '</h4>' +
                      '<h5 id="brewery-address">' + brewery.address() + '</h5>' +
                      '<h6 id="brewery-neighborhood">' + brewery.neighborhood() + '</h6>' +
                      '<p>Rating on <a id="yelp-url">yelp</a>: ' +
                      '<img id="yelp"></p></div>';
    infoWindow.setContent(infoContent);
    self.getYelpData(brewery);

    // Make the clicked on brewery the center of the map
    map.panTo(new google.maps.LatLng(brewery.lat(), brewery.lng()));

    // Open the infoWindow at the marker location
    infoWindow.open(map, brewery.marker());

    // Current brewery marker bounces once when clicked
    self.setMarkerAnimation(brewery);
  };

  // Sets the currenter marker to bounce once when clicked
  self.setMarkerAnimation = function(brewery) {
    brewery.marker().setAnimation(google.maps.Animation.BOUNCE);
    setTimeout( function() { brewery.marker().setAnimation(null); }, 750);
  };

  // Function to handle filtering of breweries based on the search form
  self.filterBreweries = function() {
    // Set the filtered brewery list to an empty array
    self.filteredBreweryList([]);

    // Get the search string and the length of the original brewery list
    var searchString = $('#search-str').val().toLowerCase();
    var len = self.breweryList().length;

    // Loop through each brewery in the brewery list
    for (var i = 0; i < len; i++) {
      // Get the current brewery name & neighborhood
      var breweryName = self.breweryList()[i].name().toLowerCase();
      var breweryNeighborhood = self.breweryList()[i].neighborhood().toLowerCase();

      // If the name or neighborhood match the search string,
      // add the brewery to the filtered brewery list
      if (breweryName.indexOf(searchString) > -1 ||
          breweryNeighborhood.indexOf(searchString) > -1) {
        self.filteredBreweryList.push(self.breweryList()[i]);
        // Set the map property of the marker to the map
        self.breweryList()[i].marker().setMap(map);
      } else {
        // Set the map property of the marker to null so it won't be visible
        self.breweryList()[i].marker().setMap(null);
      }
    }
  };

  self.getYelpData = function(brewery) {
    // Uses the oauth-signature package installed with bower per https://github.com/bettiolo/oauth-signature-js

    // Use the GET method for the request
    var httpMethod = 'GET';

    // Yelp API request url
    var yelpURL = 'http://api.yelp.com/v2/search/';

    // nonce generator
    // function credit of: https://blog.nraboy.com/2015/03/create-a-random-nonce-string-using-javascript/
    var nonce = function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    // Set required parameters for authentication & search
    var parameters = {
      oauth_consumer_key: 'S46AQ1iwQtvxw_D1wQLHZA',
      oauth_token: 'TO9rPx1abdPe3lllR5Wo3WFrvz8CV9vw',
      oauth_nonce: nonce(20),
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      term: brewery.name(),
      location: 'Denver, CO', // always search within Denver, CO
      limit: 1
    };

    // Set other API parameters
    var consumerSecret = '8hqIHpplfRBLzs6YOqLZFfkx7jg';
    var tokenSecret = 'evb3bjTox8RNlfZ5Ma74hqJjZWo';

    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    var signature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret);

    // Add signature to list of parameters
    parameters.oauth_signature = signature;

    // Set up the ajax settings
    var ajaxSettings = {
      url: yelpURL,
      data: parameters,
      cache: true,
      dataType: 'jsonp',
      success: function(response) {
        // Update the infoWindow to display the yelp rating image
        $('#yelp').attr("src", response.businesses[0].rating_img_url);
        $('#yelp-url').attr("href", response.businesses[0].url);
      }
    };

    // Send off the ajaz request to Yelp
    $.ajax(ajaxSettings);
  };

  // Add the listener for loading the page
  google.maps.event.addDomListener(window, 'load', function() {
    self.initialize();
    self.buildBreweryLocations();
    self.setBreweryClickFunctions();
    self.filteredBreweryList(self.breweryList());
  });
};

// Brewery constructor to create breweries & marks from the model
var Brewery = function(data) {
  'use strict';

  // Set all the properties as knockout observables
  var marker;
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.address = ko.observable(data.address);
  this.neighborhood = ko.observable(data.neighborhood);

  // Google Maps Marker for this location
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.lat(), this.lng()),
    map: map,
    title: this.name()
  });

  // Set the marker as a knockout observable
  this.marker = ko.observable(marker);
};

// Kick everything off!
ko.applyBindings( new ViewModel() );
