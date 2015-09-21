var map;

var ViewModel = function() {
  var self = this;
  console.log('third');

  self.initialize = function() {
    console.log('map created here!');
    var mapCanvas = document.getElementById('google-map');
    var cenLatLng = new google.maps.LatLng(breweryLocations[0].lat, breweryLocations[0].lng);
    var mapOptions = {
      center: cenLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
  };

  console.log('fourth');
  self.buildBreweryLocations = function() {
    this.breweryList = ko.observableArray([]);
    breweryLocations.forEach(function(brewItem) {
      self.breweryList.push( new Brewery(brewItem) );
      console.log('11');
    });
  };

  console.log('4');
  google.maps.event.addDomListener(window, 'load', function() {
    self.initialize();
    self.buildBreweryLocations();
  });
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