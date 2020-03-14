function appExec() {
    'use strict';
    var self = this;
    var markers = [];
    // METODO QUE INICIALIZA EL MAPA DEBE RESIVIR LAS CORDENADAS
    // DE LA PROVINCIA DONDE SE ENCUENTRA EL USUARIO
    this.init = function () {
        $(document).ready(function () {
            // AQUI SE DEBE BUSCAR LAS CORDENADAS SEGUN LA POSICION DONDE SE ENCUENTRE EL CLIENTE
            // PARA PROPOSITO DE DESARROLLO SE PONE PRVINCIA DE CHIRIQUI POR DEFECTO 
            var startCoord = {
                latitud: 8.42729,
                longitud: -82.4308472,
                position: []
            };
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
        })
    }

    // METODO QUE RETORNA LA POSICION ACTUAL DEL CLIENTE 
    // Y AUTOCOMPLETA EL CAMPO DE ORIGEN CON UNA DIRECCION 
    this.currentPosition = function () {
        return new Promise((resolve, reject) => {
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
        })
    }

    // METODO QUE ELIMINA LOS MARKER DEL MAPA
    this.removeMarker = function () {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    // METOD QUE CREA LOS MARKER EN EL MAPA
    this.addMarkers = function (position, icon, title, type, listener = false) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            draggable: true,
            title: title,
            animation: google.maps.Animation.DROP,
        });
        console.log(type)
        if (type == undefined || type == null || type == "") {
            self.removeMarker();
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
           // requestedMarker = marker;
        } else {
            var lat = position.lat
            var lng = position.lng
            console.log(position)
            var newLatLng = new google.maps.LatLng(lat, lng);
            marker.setPosition(newLatLng);
            map.setCenter(position);
            map.setZoom(15);
            //requestedMarker = marker;
            var PI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyC2Jo0QCio9e6cxw7zkSWB7B_F4MzLysaY"

            $.get(PI, function (data) {
                var construcName = data.results[1].address_components
                console.log(construcName)
                var stop = 4
                var addressFull;
                $.each(construcName, function (s, v) {
                    if (s <= stop) {
                        if (s == 0) {
                            addressFull = v.long_name
                        } else {
                            addressFull = addressFull + " " + v.long_name
                        }
                    }
                })
                $("#origin-input").val(addressFull)
            });
        }
    }
}

