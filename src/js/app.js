// Initialize the map
var map;

var infoWindow = new google.maps.InfoWindow({
  content: '<div>h4></h4></h5></h5><p>Yelp Rating: </p></div>'
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

  self.setBrewery = function(clickedBrewery) {
    // TODO: add functionality here...
    console.log('set');
  };

  // Add the listener for loading the page
  google.maps.event.addDomListener(window, 'load', function() {
    self.initialize();
    self.buildBreweryLocations();
  });
};

// Brewery constructor to create breweries & marks from the model
var Brewery = function(data) {
  var marker, infoContent;
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

  infoContent = '<div><h4>' + this.name() + '</h4></p>' + this.address() + '</p></div>';

  marker.addListener('click', function() {
    infoWindow.setContent(infoContent);
    infoWindow.open(map, marker);
  });

  // Set the marker as a knockout observables
  this.marker = ko.observable(marker);
};

// Kick everything off!
ko.applyBindings( new ViewModel() );
