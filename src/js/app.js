var map;

var initialLocations = [
  {
    name: 'Comrade Brewing Company',
    lat: 39.6791057,
    lng: -104.9030243,
    address: '7667 E Iliff Ave, Denver, CO 80231'
  },
  {
    name: 'Copper Kettle Brewing Company',
    lat: 39.6847865,
    lng: -104.88191,
    address: '1338 S Valentia St #100, Denver, CO 80247'
  },
  {
    name: 'Bull & Bush Brewing Company',
    lat: 396713773,
    lng: -1048998513,
    address: '4700 E Cherry Creek S Dr, Denver, CO 80246'
  }
];

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

  initialLocations.forEach(function(locItem) {
    console.log(locItem);
    this.locationList.push( new Brewery(locItem) );
  });
};

// ko.applyBindings(new ViewModel());