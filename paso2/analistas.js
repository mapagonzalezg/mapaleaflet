function detectCentroids(){
    //los elementos de drawnlayer se van guardando en layer con funcion anonima
    drawnLayers.forEach(
        function(layer){
            //try catch se usa cuando algo pueda fallar como conectarme a una api

            try{
                let centroid= turf.centroid(layer.toGeoJSON());
                //crear marcador del centroide
                L.geoJSON(centroid,{
                    style:{
                        color:"red",
                        fillColor:"green"

                    }

                }).addTo(map);
                console.log(centroid);
                //transformar capa a json

            }catch(error){
                console.warn("error al detectar cendroides", error);

            }
            {

            }
        }
    )

}
function calculateAreas(){
    //recorrer el arreglo de las capas ,calcular el areas y mostrar
    drawnLayers.forEach(
        function(layer){
            try{
                let area=turf.area(layer.toGeoJSON());
                let centroid=turf.centroid(layer.toGeoJSON());
                x=centroid.geometry.coordinates[1];
                y=centroid.geometry.coordinates[0];
                L.marker([x,y],{
                    icon: L.divIcon(
                        {
                            className:"area label",
                            html:  `${area} m2`

                        }
                    )
                }
                ).addTo(map);
                console.log(area);

            }catch(error){
                console.warn("hubo un error con el area")
            }
        }
    
    )
}
//Se define la función calculateDistance() que calculará la distancia entre los centroides de los polígonos dibujados.
function calculateDistance() {
//Si el usuario no ha dibujado al menos dos polígonos, se muestra un mensaje en la consola y la función se detiene con return.
    if (drawnLayers.length < 2) {
        console.warn("Debe haber al menos dos polígonos para calcular la distancia.");
        return;
    }
//Se usa .map() para convertir cada layer en su centroide con turf.centroid().
//centroids es ahora un arreglo que contiene todos los centroides de los polígonos en formato GeoJSON.   
    try {
        let centroids = drawnLayers.map(layer => turf.centroid(layer.toGeoJSON()));

        // Tomamos los primeros dos centroides para calcular la distancia
        let distance = turf.distance(centroids[0], centroids[1], { units: 'kilometers' });

        // Coordenadas del punto medio para mostrar la distancia en el mapa
        let midPoint = turf.midpoint(centroids[0], centroids[1]);
//las coordenadas están en formato [longitud, latitud], pero Leaflet usa [latitud, longitud], por eso se invierten:
//x = latitud
//y = longituD
        let x = midPoint.geometry.coordinates[1];
        let y = midPoint.geometry.coordinates[0];

        // Crear un marcador en el punto medio con la distancia
        L.marker([x, y], {
            icon: L.divIcon({
                className: "distance-label",
            
                html: `${distance} km`,
                iconSize: [100, 40]
            })
        }).addTo(map);
//Imprime la distancia en la consola del navegador, útil para depuración.
        console.log(`Distancia: ${distance} km`);
//Si ocurre un error (por ejemplo, si drawnLayers no tiene geometrías válidas), se muestra un mensaje en la consola.
    } catch (error) {
        console.warn("Error al calcular la distancia:", error);
    }
}
