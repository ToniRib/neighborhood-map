var map;

var initialLocations = [
  {
    name: 'Dumb Friends League',
    lat: 39.6791057,
    lng: -104.9030243,
  },
  {
    name: 'Copper Kettle Brewing Company',
    lat: 39.6847865,
    lng: -104.88191
  }
];

function initMap() {
  // Create a map object and specify the DOM element for display.

  var $map = $('#map');

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.679,
      lng: -104.903
    },
    zoom: 13
  });
}

var Location = function(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
};

var ViewModel = function() {
  self = this;

  this.locationList = ko.observableArray([]);
  console.log(this.locationList);

  initialLocations.forEach(function(locItem) {
    console.log(locItem);
    this.locationList.push( new Location(locItem) );
  });
};

// ko.applyBindings(new ViewModel());