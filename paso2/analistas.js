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