let centroides=document.getElementById("centroid");
centroides.addEventListener('click', function(){
    console.log("VAMOS A CALCULAR CENTROIDES");
    detectCentroids();
})
let area=document.getElementById("area");
area.addEventListener('click',
    function(){
        console.log("VAMOS A CALCULAR AREAS");
        calculateAreas();  
    }
)