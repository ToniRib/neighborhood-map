// Initialize the map
var map;

var infoWindow = new google.maps.InfoWindow({
  content: '<div><h4 id="brewery-name"></h4><p id="brewery-address"></p><p id="yelp"></p></div>'
});

// Set up the ViewModel
var ViewModel = function() {
  var self = this;
  this.breweryList = ko.observableArray([]);

  // Create the google map zoomed in on Denver
  self.initialize = function() {
    var mapCanvas = document.getElementById('google-map');
    var cenLatLng = new google.maps.LatLng(39.716209, -104.940702);
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

  self.setBreweryClickFunctions = function() {
    self.breweryList().forEach(function(brewery) {
      google.maps.event.addListener(brewery.marker(), 'click', function() {
        self.breweryClick(brewery);
      });
    });
  };

  self.breweryClick = function(brewery) {
    infoContent = '<div><h4 id="brewery-name">' + brewery.name() + '</h4>' +
                  '<p id="brewery-address">' + brewery.address() + '</p>' +
                  '<p>Rating on yelp: <img id="yelp"></p></div>';
    infoWindow.setContent(infoContent);
    self.getYelpData(brewery);
    infoWindow.open(map, brewery.marker());
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
      location: 'Denver, CO',
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
  });
};

// Brewery constructor to create breweries & marks from the model
var Brewery = function(data) {
  var marker;
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.address = ko.observable(data.address);

  // Google Maps Marker for this location
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.lat(), this.lng()),
    map: map,
    title: this.name()
  });

  // Set the marker as a knockout observables
  this.marker = ko.observable(marker);
};

// Kick everything off!
ko.applyBindings( new ViewModel() );
