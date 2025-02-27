//set wiew latitud , longitud y zoom
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//configuración de menu de geoman
map.pm.addControls(
    {
        position:'topleft',
        drawMarker:true
    }
);