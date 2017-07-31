(function () {

  'use strict';

  // Crear el mapa
  google.maps.event.addDomListener(window, 'load', initMap);

  function initMap() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 2,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(19.402980, -99.170183),

      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_RIGHT
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      scrollwheel: false,

      // How you would like to style the map.
      // This is where you would paste any style found on Snazzy Maps.
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#072f4a"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#167593"},{"lightness":5}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"saturation":"24"},{"lightness":"3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#011420"}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map-globe');

    if (mapElement !== null) {
      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(19.402980, -99.170183),
        map: map,
        title: 'NORTHGATE',
        icon: "images/map-marker.svg"
      });
    }
  }

}());
