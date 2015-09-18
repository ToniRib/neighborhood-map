var map;

function initMap() {
  // Create a map object and specify the DOM element for display.

  map = new google.maps.Map(document.getElementById('google-map'), {
    center: {
      lat: 39.679,
      lng: -104.903
    },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}

var Brewery = function(data) {
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;
  this.address = data.address;

  // Google Maps Marker for this location
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: this.name
  });
};

var ViewModel = function() {
  var self = this;

  google.maps.event.addDomListener(window, 'load', initMap);

  this.breweryList = ko.observableArray([]);
  breweryLocations.forEach(function(brewItem) {
    self.breweryList.push( new Brewery(brewItem) );
  });



};

ko.applyBindings(new ViewModel() );