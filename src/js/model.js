// ---- MODEL ---- //
// List of (most of) the breweries I've visited in Denver

// Neighborhood located using https://www.denvergov.org/maps/map/neighborhoods
var breweryLocations = [
  {
    name: 'Comrade Brewing Company',
    lat: 39.675659,
    lng: -104.898488,
    address: '7667 E Iliff Ave, Denver, CO 80231',
    neighborhood: 'Virginia Village'
  },
  {
    name: 'Copper Kettle Brewing Company',
    lat: 39.6926811,
    lng: -104.8913405,
    address: '1338 S Valentia St #100, Denver, CO 80247',
    neighborhood: 'Aurora'
  },
  {
    name: 'Bull & Bush',
    lat: 39.7030711,
    lng: -104.9324947,
    address: '4700 E Cherry Creek S Dr, Denver, CO 80246',
    neighborhood: 'Washington Virginia Vale'
  },
  {
    name: 'Dry Dock Brewing Co',
    lat: 39.6527382,
    lng: -104.812003,
    address: '15120 E Hampden Ave, Aurora, CO 80014',
    neighborhood: 'Aurora'
  },
  {
    name: 'Platt Park Brewing Company',
    lat: 39.682588,
    lng: -104.9808019,
    address: '1875 S Pearl St, Denver, CO 80210',
    neighborhood: 'Platt Park'
  },
  {
    name: 'Former Future Brewing Company',
    lat: 39.6933935,
    lng: -104.9870699,
    address: '1290 S Broadway, Denver, CO 80210',
    neighborhood: 'Platt Park'
  },
  {
    name: 'Lowdown Brewery',
    lat: 39.7293714,
    lng: -104.9857492,
    address: '800 Lincoln St, Denver, CO 80203',
    neighborhood: 'Capitol Hill'
  },
  {
    name: 'Vine Street Pub & Brewery',
    lat: 39.7434001,
    lng: -104.9619981,
    address: '1700 Vine St, Denver, CO 80206',
    neighborhood: 'City Park West'
  },
  {
    name: 'Great Divide Brewing Co',
    lat: 39.7539071,
    lng: -104.9883847,
    address: '2201 Arapahoe St, Denver, CO 80205',
    neighborhood: 'Five Points'
  },
  {
    name: 'Denver Beer Co',
    lat: 39.7583015,
    lng: -105.0072748,
    address: '1695 Platte St, Denver, CO 80202',
    neighborhood: 'Highlands'
  },
  {
    name: 'Wynkoop Brewing Company',
    lat: 39.7534879,
    lng: -104.9983932,
    address: '1634 18th St, Denver, CO 80202',
    neighborhood: 'Union Station'
  },
  {
    name: 'Mu Brewery',
    lat: 39.740434,
    lng: -104.8746332,
    address: '8735 E Colfax Ave, Aurora, CO 80010',
    neighborhood: 'Aurora'
  },
  {
    name: 'Wit\'s End Brewing Company',
    lat: 39.7206191,
    lng: -105.0174908,
    address: '2505 W 2nd Ave #13, Denver, CO 80219',
    neighborhood: 'Valverde'
  },
  {
    name: 'Station 26 Brewing Co',
    lat: 39.7695714,
    lng: -104.9059639,
    address: '7045 E 38th Ave, Denver, CO 80207',
    neighborhood: 'Northeast Park Hill'
  },
  {
    name: 'Alpine Dog Brewing Company',
    lat: 39.740326,
    lng: -104.974929,
    address: '1505 Ogden St, Denver, CO 80218',
    neighborhood: 'North Capitol Hill'
  },
  {
    name: 'River North Brewery',
    lat: 39.7583051,
    lng: -104.9895952,
    address: '2401 Blake St #1, Denver, CO 80205',
    neighborhood: 'Five Points'
  },
  {
    name: 'Joyride Brewing Company',
    lat: 39.7531998,
    lng: -105.0536343,
    address: '2501 Sheridan Blvd, Edgewater, CO 80214',
    neighborhood: 'Sloan\'s Lake'
  },
  {
    name: 'Prost Brewing Company',
    lat: 39.761502,
    lng: -105.006618,
    address: '2540 19th St, Denver, CO 80211',
    neighborhood: 'Highlands'
  },
  {
    name: 'Breckenridge Colorado Craft',
    lat: 39.7352311,
    lng: -104.9803669,
    address: '2220 Blake St, Denver, CO 80205',
    neighborhood: 'Five Points'
  },
  {
    name: 'Trve Brewing Company',
    lat: 39.719919,
    lng: -104.987686,
    address: '227 Broadway St #101, Denver, CO 80203',
    neighborhood: 'Baker'
  },
  {
    name: 'The Brew on Broadway',
    lat: 39.6541046,
    lng: -104.9880198,
    address: '3445 S Broadway, Englewood, CO 80113',
    neighborhood: 'Englewood'
  }
];