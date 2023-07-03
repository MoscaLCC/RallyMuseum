function carregaMarkers(valores){
    console.log('chega')
    alert('chega')
    map = document.getElementById("map")
    for (item in valores['results']['bindings']){
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': "Fafe"}, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            })
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        })
    }
}

