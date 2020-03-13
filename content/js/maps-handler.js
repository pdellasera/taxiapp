var requestedMarker;
var directionsDisplayMap;
var directionsServiceMap;



function multipleRouteHide() {
    directionsDisplayMap.setMap(null);
}

// function multipleRoute(directionsService, directionsDisplay) {
//     directionsDisplayMap = new google.maps.DirectionsRenderer({ suppressMarkers: true });
//     directionsDisplayMap.setOptions({
//         polylineOptions: {
//             strokeColor: '#FFD300',
//             strokeWeight: 5,
//             strokeOpacity: 0
//         }
//     });
//     directionsDisplayMap.setMap(map);
//     directionsServiceMap = directionsService;
//     var waypts = [{
//         location: "37 Norte, 79° 31 12 Oeste",
//         stopover: true
//     }];
//     var coordinates = [{ lat: 8.9936, lng: -79.5201 }];
//     var icons = {
//         end: new google.maps.MarkerImage(
//             // URL
//             '../icons/end.svg',
//             // (width,height)
//             new google.maps.Size(58, 53),
//             // The origin point (x,y)
//             new google.maps.Point(0, 0),
//             // The anchor point (x,y)
//             // new google.maps.Point(100, 8),
//             // new google.maps.Size(25, 25)
//         ),
//         marker: new google.maps.MarkerImage(
//             // URL
//             '../icons/red-marker.svg',
//             // (width,height)
//             new google.maps.Size(28, 45),
//             // The origin point (x,y)
//             new google.maps.Point(0, 0),
//             // The anchor point (x,y)
//             new google.maps.Point(15, 28),
//             // new google.maps.Size(28, 72)
//         )
//     };
//     directionsService.route({
//         origin: "100 Institute Rd, Worcester, MA",
//         destination: "919 main street, Worcester, MA",
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: 'DRIVING'
//     }, function (response, status) {
//         if (status === 'OK') {
//             directionsDisplayMap.setDirections(response);
//             renderDirectionsPolylines(response, map);
//         } else {
//             window.alert('Directions request failed due to ' + status);
//         }
//     });
//     makeMarker({ lat: 42.251450, lng: -71.819469 }, icons.end, "Route End");
//     for (var i = 0; i < coordinates.length; i++) {
//         makeMarker(coordinates[i], icons.marker, "Route Stop");
//     }
// }

function renderDirectionsPolylines(response, map) {
    var bounds = new google.maps.LatLngBounds();
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
    };
    var polylineOptions = [{
        icons: [{
            "icon": {
                "path": 0,
                "scale": 3,
                "fillOpacity": 0.7,
                "fillColor": "#707070",
                "strokeOpacity": 0.8,
                "strokeColor": "#707070",
                "strokeWeight": 1
            },
            "repeat": "10px"
        }],
        strokeColor: "#000000",
        strokeOpacity: 0,
        strokeWeight: 5
    }, {
        strokeColor: '#FFD300',
        strokeWeight: 5
    }];
    var legs = response.routes[0].legs;
    for (i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            var stepPolyline = new google.maps.Polyline(i > 0 ? polylineOptions[1] : polylineOptions[0]);
            for (k = 0; k < nextSegment.length; k++) {
                stepPolyline.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
            }
            stepPolyline.setMap(map);
        }
    }
    // map.fitBounds(bounds);
}

function fromSetRouteToAddRoute() {
    $('.title').text("Hacia donde viajas");
    $('.gm-style > div:first-child').show("slow");
    $('.back-to-map').addClass('hidden');
}
var map;
var directionsDisplay;
var currentLocation;
const startCoord = {
    latitud: "",
    longitud: "",
    position: []
};

const myCoord = () =>
    new Promise((resolve, reject) => {
        const geoSuccess = position => resolve(position);
        const geoFailure = error => reject(error);
        const geoOptions = {
            timeout: 5000,
            maximumAge: 5000,
            enableHighAccuracy: false
        };
        navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoFailure,
            geoOptions
        );
    });

const getLocation = async () => {
    const response = await myCoord();
    console.log(response)
    startCoord.latitud = response.coords.latitude
    startCoord.longitud = response.coords.longitude,
    startCoord.position = response.coords
    cookie.set("currentPosition", JSON.stringify(startCoord), 1)

};

getLocation()
function initMap() {
    setTimeout(function () {
        var lat = startCoord.latitud
        var long = startCoord.longitud
        map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            center: { lat: lat, lng: long },
            zoom: 15,
            fullscreenControl: false,
        });
        directionsDisplay = new google.maps.DirectionsRenderer();
        new AutocompleteDirectionsHandler(map);
        $(window).on('resize', function () {
            google.maps.event.trigger(map, 'resize');
        })
        makeMarker({ lat: lat, lng: long }, '../images/icons8-user-location-40.png', 'Urbanizacion La Foresta', true)
    }, 500)
}

function hideMapRequestPin() {
    requestedMarker.setVisible(false);
    $('.tapped-car-info').addClass('hidden');

}

function showMapRequestPin() {
    var icons = {
        request: new google.maps.MarkerImage(
            // URL
            '../icons/car-start-position.svg',
            // (width,height)
            new google.maps.Size(36, 28),
            // The origin point (x,y)
            new google.maps.Point(0, 0),
            // The anchor point (x,y)
            new google.maps.Point(0, 8),
            new google.maps.Size(36, 28)
        )
    };
    makeMarker({ lat: 42.274006, lng: -71.810181 }, icons.request, "Request Pin", false);
    setTimeout(function () {
        if (!$("img[src='../icons/car-start-position.svg']").parent().hasClass('pulse')) {
            $("img[src='../icons/car-start-position.svg']").parent().addClass('pulse').css('opacity', 1);
        }
    }, 600);
}

/**
 * @constructor
 */
function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplayMap = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    this.directionsDisplayMap.setOptions({
        polylineOptions: {
            strokeColor: '#FFD300',
            strokeWeight: 5
        }
    });
    this.directionsDisplayMap.setMap(map);
    var self = this;
    $('.map-input .remove')
        .add('.submit-review .close-review').
        add('.submit-review .btn-primary').on('click', function () {
            self.directionsDisplayMap.setMap(null);
            if ($(this).closest('.map-input').find('input').attr('id') == 'origin-input') {
                self.originPlaceId = null;
            }
            else {
                self.destinationPlaceId = null;
            }
        });
    var originInput = document.getElementById('origin-input');
    var originInputContainer = document.getElementById('origin-input-container');
    var destinationInput = document.getElementById('destination-input');
    var destinationInputContainer = document.getElementById('destination-input-container');

    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // originInputContainer.appendChild(originAutocomplete);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete =
        new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id']);

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(originInputContainer);
}

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            $('.request-ride-btn').addClass('hidden');
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.destinationPlaceId) {
        $('.request-ride-btn').addClass('hidden');
        return;
    }
    var me = this;
    var currentPosition = JSON.parse(cookie.get("currentPosition"))
    //console.log(currentPosition)
    $('.request-ride-btn').removeClass('hidden');
    var lat = currentPosition.latitud
    var lon = currentPosition.longitud
    var origin = new google.maps.LatLng(lat, lon)
    this.directionsService.route(
        {
            origin: origin,
            destination: $("#destination-input").val(),
            travelMode: this.travelMode
        },
        function (response, status) {
            if (status === 'OK') {
                var icons = {
                    start: new google.maps.MarkerImage(
                        // URL
                        '',
                        // (width,height)
                        new google.maps.Size(26, 21),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(13, 16),
                        new google.maps.Size(26, 21)
                    ),
                    end: new google.maps.MarkerImage(
                        // URL
                        '../images/end.png',
                        // (width,height)
                        new google.maps.Size(58, 53),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(22, 32)
                    )
                };
                me.directionsDisplayMap.setMap(map);
                me.directionsDisplayMap.setOptions({
                    polylineOptions: {
                        strokeColor: '#FFD300',
                        strokeWeight: 5
                    }
                });
                me.directionsDisplayMap.setDirections(response);
                var leg = response.routes[0].legs[0];
                makeMarker(leg.start_location, icons.start, "Route Start");
                makeMarker(leg.end_location, icons.end, 'Route End');
                setTimeout(function () {
                    var currents = $("#map img[src='../icons/circle.svg']").parent();
                    currents.each(function (index, current) {
                        if (!$(current).hasClass('pulse current-location') && !$(current).hasClass('map-input-icon')) {
                            $(current).addClass('pulse current-location').css('opacity', 1);
                        }
                    });
                }, 600);
            } else {
                window.alert('Solicitud de direcciones fallida debido a' + status);
            }

        }
    );
    map.setZoom(12);
    $(window).trigger('resize');
};
var markers = [];

function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null); //Remove the marker from the map
    }
}

function makeMarker(position, icon, title, listener = false) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        draggable: true,
        title: title,
        animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
    // var addListenerToMarker = function (myMarker) {
    //     marker.addListener('click', function () {
    //         var elem = this
    //         console.log(elem)
    //        $('.tapped-car-info').removeClass('hidden');
    //     });
    // }
    // if (listener) {
    //     // add a closure for listener manage
    //     addListenerToMarker(marker);

    // }
    google.maps.event.addListener(marker, 'dragend', function () {
        geocodePosition(marker.getPosition());
    });
    map.setCenter(position);
    map.setZoom(15);
    requestedMarker = marker;
}


function geocodePosition(pos) {
    console.log(pos)
    geocoder = new google.maps.Geocoder();
    geocoder.geocode
        ({
            latLng: pos
        },
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $("#mapSearchInput").val(results[0].formatted_address);
                    $("#mapErrorMsg").hide(100);
                }
                else {
                    $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
                }
            }
        );
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

