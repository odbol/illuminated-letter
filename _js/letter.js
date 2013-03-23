// ensure the web page (DOM) has loaded

(function( $ , exports){

  var 
    /********* LETTER **********/
    nextPage = function nextPage() {
      $('#letter .active')
        .removeClass('active')
        .next()
          .addClass('active');
    },

    showPage = nextPage, // lazy


    showEnding = function showEnding() {
      $('#outro').show();

      $('#intro')

        .fadeIn(2000);
    },

    /********* MAP **********/
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


    /********* MEDIA **********/
    curZIndex = 10,
    addMedia = function addMedia(url, title, type, isVertical) {
      var html = '',
          vimeoId = null,
          attrs = 'class="item ' + type + 
            (isVertical ? ' vertical' : ' horizontal') + 
            '" style="z-index:' + (++curZIndex) + ';"';

      switch (type) {
        case 'image':
          html = '<img src="' + url + '" '  + attrs + ' />';
          break;
        case 'video':
          var 
            image = [url],
            vidTag = '<video ' + attrs;

          vidTag += " autoplay='true' loop='true' muted='true'>";
  
          for (var i in image) {
              vidTag += "<source src='" + url + "'";
              //vidTag += " type='" + image[i].mimetype + "'";
              vidTag += " />";
          }
          vidTag += "</video>";

          html = vidTag;
          break;
        case 'vimeo':
          vimeoId = 'vimeo_' + curZIndex;
          html = '<div id="' + vimeoId + '" />';

          break;
        default:
          return;
      }

      //html = '<div ' + attrs + '>' + html + '</div>';

      var el = $(html)
        .appendTo('#media');

      el.centerImage('inside');

      el
        .fadeIn('slow')
        // remove old videos after they've cross faded
        .siblings()
          .fadeOut('slow')
          .each(function (i, el) {
            var $self = $(this);

            setTimeout(2000, function () {
              $self.remove();
            });
          });

      if (vimeoId) {

          var vim = Popcorn.vimeo( "#" + vimeoId, url );
          vim.play();

          vim.on('ended', showEnding);
      }
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
            addMapPin(52.518101, 13.3933, "University of Berlin, Germany");
          });

        pop.cue(27, function () {
            addMapPin(54.139809, 13.76879, "Peenemunde, Germany");
          });

        pop.cue("1:27", function () {
            addMapPin(38.879551, -77.079964, "Fort Myer, VA", 14);
          });
 
        pop.cue("1:44", function () {
            addMapPin(32.765827, -106.30394, "White Sands, NM", 8);
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


        // VIDEOS
        pop.cue(1, function () {
          addMedia('video/Dear_Ma.m4v', 'Dear Ma', 'video');
        });

        pop.cue(5, function () {
          addMedia('img/timeline/slide_rule/Sliderule.jpg', 'Slide Rule', 'image');
        });        

        pop.cue(11, function () {
          addMedia('img/timeline/HiliteDrSchilling.jpg', 'Dr. Schilling', 'image');
        });

        pop.cue(27, function () {
          addMedia('img/timeline/Peenemunde/Peenemundeworkers.jpg', 'Peenemunde Workers', 'image', true);
        });

        pop.cue(36, function () {
          addMedia('video/Nazi_V2s.m4v', 'V2 Rocket', 'video');
        });

        pop.cue("1:09", function () {
          addMedia('img/timeline/Jewish.jpg', 'Jewish', 'image', true);
        });

        pop.cue("1:29", function () {
          addMedia('img/timeline/Washington-Heights-1946/Drug_Store.jpg', 'Drug Store', 'image', true);
        });       

        pop.cue("1:33", function () {
          addMedia('img/timeline/Washington-Heights-1946/piggly_wiggly.jpg', 'Washington Heights', 'image', true);
        });   

        pop.cue("1:43", function () {
          addMedia('video/V2_footage.m4v', 'V2 Testing', 'video');
        });

        pop.cue("2:04", function () {
          addMedia('img/timeline/carlsbad.jpg', 'Carlsbad Caverns', 'image');
        });   

        // ending
        pop.on("ended", function () {
          addMedia('https://vimeo.com/59180676', 'Documentary', 'vimeo');
        });



        // play the video right away
        pop.play();
    };




    $('#letter').on('click', '.page', nextPage);

    $('#intro').click(function () {
      $('#intro').fadeOut(2000, init);//.removeClass('shown');
    });

     $('#outro').click(function() {
        window.reload(false);
     });


})( jQuery, window );