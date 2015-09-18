var map;

// function initMap() {
//   // Create a map object and specify the DOM element for display.

//   map = new google.maps.Map(document.getElementById('google-map'), {
//     center: {
//       lat: 39.679,
//       lng: -104.903
//     },
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });

//   // Dummy marker for testing
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(39.6791057, -104.9030243),
//     map: map,
//     title: 'Comrade Brewing Co'
//   });
// }

var ViewModel = function() {
  var self = this;
  console.log('third');

  self.initialize = function() {
    console.log('map created here!');
    var mapCanvas = document.getElementById('google-map');
    var cenLatLng = new google.maps.LatLng(breweryLocations[0].lat, breweryLocations[0].lng);
    var mapOptions = {
      center: cenLatLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
  };

  console.log('fourth');
  this.breweryList = ko.observableArray([]);
  breweryLocations.forEach(function(brewItem) {
    self.breweryList.push( new Brewery(brewItem) );
    console.log('11');
  });

  console.log('4');
  google.maps.event.addDomListener(window, 'load', self.initialize);

};

console.log('first');

var Brewery = function(data) {
  console.log('6');
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;
  this.address = data.address;

  // Google Maps Marker for this location
  console.log('7');
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: this.name
  });
  console.log('8');
};

console.log('second');
ko.applyBindings(new ViewModel() );
console.log('10');