var map;
var marker;
var markers = [];
var openedMapInfo;

function initMap() {
  var elem = document.getElementById("map-frame");
  if (!elem) {return;}
  map = new google.maps.Map(elem, {
    zoom: 14,
    center: new google.maps.LatLng(51.0395772, -114.0704973),
    mapTypeId: "terrain",
    maxWidth: 300,
    styles: [{"featureType":"road", "elementType":"labels", "stylers":[{"visibility":"off"}]}, {"featureType":"poi", "elementType":"labels", "stylers":[{"visibility":"off"}]}, {"featureType":"transit", "elementType":"labels.text", "stylers":[{"visibility":"off"}]}]
  });

  var lifestyleMarkerImage = "../../assets/images/lifestyle-map-pin.png";
  var communityMarkerImage = "../../assets/images/community-map-pin.png";
  var livingMarkerImage = "../../assets/images/living-map-pin.png";

  for (var i = 0; i < properties.length; i++) {
    var markerPin;
    var markerZIndex;
    var property = properties[i];

    // Check what property the current marker is attached to
    if (property[3] === 'lifestyle') {
      markerPin = lifestyleMarkerImage;
      markerZIndex = 1;
    } else if (property[3] === 'communities') {
      markerPin = communityMarkerImage;
      markerZIndex = 2;
    } else {
      markerPin = livingMarkerImage;
      markerZIndex = 3;
    }

    var content = '<div class="' + property[3] + ' map-frame-infobox">' +
					'<i class="icon-delete" style="position: absolute;right: 5px;top: 5px;cursor: pointer"></i>' +
					'<figure class="map-infobox-img">' +
						'<img src="' + property[4] + '" alt="' + property[0] + '" title="' + property[0] + '" />' +
						'<img class="property-image" src="../../assets/images/logos-mini/' + property[3] + '-mini.jpg" alt="">' +
					'</figure>' +
					  '<h3 class="map-infobox-title">' + property[0] + '</h3>' +
					  '<p class="map-infobox-address">' + property[5] + '</p>' +
					  '<hr />' +
					  '<div class="price-wrapper">' +
						'<div class="price-align">' +
							'<span><sup>$</sup>' + property[6] + '</span><span>and<br />up</span>' +
							'<i class="icon-pet d-block d-md-none"></i>' +
						'</div>' +
					  '</div>' +
					  '<a href="' + property[7] + '" class="arrow-link blue">Learn More</a>' +
                  '</div>'

    var infowindow = new google.maps.InfoWindow();

    // Add marker to the map
    marker = new google.maps.Marker({
      position: { lat: property[1], lng: property[2] },
      map: map,
      icon: markerPin,
      title: property[0],
      zIndex: markerZIndex,
      content: content,
      propertyID: property[8]
    });

    markers.push(marker); // Adds marker to an array for easy access

    marker.addListener("click", function () {
      $(".infobox").remove();
      openedMapInfo = false;
      for (var i = 0; i < markers.length; i++) {
        markers[i].setAnimation(null);
      }

      toggleBounce(this);

      // Open infowindow
      if (openedMapInfo === true) {
        openedMapInfo = false;
        $('.infobox').remove();
        $(".property-list-item").removeClass("selected-property");
      } else {
        $('.map-wrap').append('<div class="infobox"></div>');
        $('.infobox').append(this.content)
        openedMapInfo = true;
      }

      var propertyID = this.propertyID;

      $('#' + propertyID).toggleClass('selected-property');
    });
  }
}

// Bounce
function toggleBounce(ele) {
  if (ele.getAnimation() !== null) {
    ele.setAnimation(null);
  } else {
    ele.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// Property Results Interactions

// Go to top of map when pin clicked
$(".property-list-img button").on("click tap", function () {
  $("html, body").animate(
    {
      scrollTop: $(".advanced-filters-toggle button").offset().top
    },
    600
  );

  // trigger property pin in map

  var propertyChoice = $(this).attr('data-property');

  for (var i = 0; i < markers.length; i++) {
    var currentPropertyID = markers[i].propertyID;

    if (propertyChoice == currentPropertyID) {
      google.maps.event.trigger(markers[i], "click");
    }
  }
});
