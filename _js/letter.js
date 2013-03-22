// ensure the web page (DOM) has loaded

(function( $ , exports){

  var 
    nextPage = function nextPage() {
      $('#letter .active')
        .removeClass('active')
        .next()
          .addClass('active');
    },

    showPage = nextPage, // lazy

    gmap = null,

    addMapPin = function addMapPin(lat, lon, title, zoom) {
      
      if (gmap) {
        var loc = new google.maps.LatLng(lat, lon),
          marker = new google.maps.Marker({
              position: loc,
              map: gmap,
              title: title
          });

        gmap.panTo(loc);

        zoom && gmap.setZoom(zoom);

        return marker;
      }

      return null;
    },

    init = function () {
 
        // Create a popcorn instance by calling Popcorn("#id-of-my-video")
        var pop = Popcorn("#ourvideo");

        // MAP LOCATIONS
        pop.googlemap({
            start: 1,
            //end: 5,
            type: "HYBRID",
            target: "map",
            zoom: 7,
            //location: "fort bliss, texas",
            lat: 32.259361,
            lng: -106.075928,
            onmaploaded: function( options, map ) {
              // map is a reference to the actual map object
              // options is the options object that was passed in initially

              gmap = map;

              addMapPin(32.259361, -106.075928, "Fort Bliss, Texas");
           }
        });

        pop.cue(12, function () {
            addMapPin(52.516071, 13.37698, "Berlin, Germany"); 
          });

        pop.cue(22, function () {
            addMapPin(52.518101, 13.3933, "University of Berlin, Germany", 8);
          });

        pop.cue(27, function () {
            addMapPin(54.139809, 13.76879, "Peenemunde, Germany");
          });

        pop.cue("1:27", function () {
            addMapPin(38.879551, -77.079964, "Fort Myer, VA", 8);
          });
 
        pop.cue("1:44", function () {
            addMapPin(32.765827, -106.30394, "White Sands, NM", 10);
          });

        pop.cue("2:02", function () {
            addMapPin(32.144573, -104.550552, "Carlsbad Natural Caverns, NM");
          });


        // PAGE TURNS
        pop.cue(46, function () {
          showPage(2);
        });

        pop.cue("1:39", function () {
          showPage(3);
        });

        // play the video right away
        pop.play();
    };




    $('#letter').on('click', '.page', nextPage);

    $('#intro').click(function () {
      $('#intro').fadeOut('slow', init);//.removeClass('shown');
    });


})( jQuery, window );