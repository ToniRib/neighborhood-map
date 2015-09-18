// Initialize the map
var map;
var mapCanvas = document.getElementById('google-map');
var cenLatLng = new google.maps.LatLng(breweryLocations[0].lat, breweryLocations[0].lng);
var mapOptions = {
  center: cenLatLng,
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
map = new google.maps.Map(mapCanvas, mapOptions);

// Set up the ViewModel
var ViewModel = function() {
  var self = this;

  this.breweryList = ko.observableArray([]);
  breweryLocations.forEach(function(brewItem) {
    self.breweryList.push( new Brewery(brewItem) );
  });

};

// Create the brewery objects
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

  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h4 id="firstHeading" class="firstHeading">' + this.name + '</h4>'+
        '<div id="bodyContent">'+
        '<p>address: ' + this.address + '</p>'+
        '</div>'+
        '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

};

// Kick everything off!
ko.applyBindings(new ViewModel() );