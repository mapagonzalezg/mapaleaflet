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
function calculateDistances() {
    // Verificar que haya al menos dos polígonos dibujados
    if (drawnLayers.length < 2) {
        console.warn("Debe haber al menos dos polígonos para calcular la distancia.");
        return;
    }

    try {
        // Obtener los centroides de todos los polígonos
        let centroids = drawnLayers.map(layer => turf.centroid(layer.toGeoJSON()));

        // Recorrer todos los centroides menos el último (porque comparamos con el siguiente)
        for (let i = 0; i < centroids.length - 1; i++) {
            // Calcular la distancia entre el centroide actual y el siguiente
            let distance = turf.distance(centroids[i], centroids[i + 1], { units: 'kilometers' });

            // Calcular el punto medio entre los dos centroides
            let midPoint = turf.midpoint(centroids[i], centroids[i + 1]);

            // Extraer las coordenadas del punto medio (Leaflet usa latitud, longitud)
            let x = midPoint.geometry.coordinates[1]; // Latitud
            let y = midPoint.geometry.coordinates[0]; // Longitud

            // Crear un marcador en el punto medio con la distancia
            L.marker([x, y], {
                icon: L.divIcon({
                    className: "distance-label", // Clase para personalizar con CSS
                    html: `${distance} km`, // Mostrar la distancia con 2 decimales
                    iconSize: [100, 40] // Ajustar tamaño del cuadro de texto
                })
            }).addTo(map);

            // Mostrar en la consola la distancia entre los centroides
            console.log(`Distancia ${i + 1} → ${i + 2}: ${distance} km`);
        }
    } catch (error) {
        console.warn("Error al calcular las distancias:", error);
    }
}

