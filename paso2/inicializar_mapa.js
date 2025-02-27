var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.pm.addControls({
    position:'topleft',
    drawCircle:false

})
let drawnLayers=[];
let intersectionsLayers=[]

//manejadores para el mapa, manejadores de eventos
//cree algo usando geoman se genera esa función anonima
// e recoje los datos del evento
//guardo la capa en mylayer
map.on("pm:create",function(e) {
    let myLayer= e.layer;
    //si la capa que hice es un poligono entonces agregar al arreglo drawnlayers
    //push
    if(myLayer instanceof L.Polygon){
        //agregar el objeto capa al arreglo
        drawnLayers.push(myLayer);
        console.info("has creado un poligono")
    }
})
//filtrar las capas y filtrar todas las capas menos la que devolvio
map.on("pm:remove",function(e) {
    drawnLayers=drawnLayers.filter((layer)=>layer !=e.layer)
    console.log("has borrado un poligono");
    
})
