var map;

function initMap() {
  // Create a map object and specify the DOM element for display.

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.679,
      lng: -104.903
    },
    zoom: 13
  });
}

var Brewery = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.coordinates = ko.observable(new google.maps.LatLng(data.lat, data.lng));

  this.marker = new google.maps.Marker({
    position: this.latLng(),
    map: null,
    title: this.name()
  });

};

var ViewModel = function() {
  self = this;

  this.locationList = ko.observableArray([]);
  console.log(this.locationList);

  breweryLocations.forEach(function(locItem) {
    console.log(locItem);
    this.locationList.push( new Brewery(locItem) );
  });
};

// ko.applyBindings(new ViewModel());