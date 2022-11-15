function grafic3() {     
    $.ajax({
        type:"GET", 
        url: "mostrejos.jsp", 
        success: function(data) {
                var utils = $.pivotUtilities;
                var sortAs =  $.pivotUtilities.sortAs;
                var heatmap =  utils.renderers["Heatmap"];
                observa = data;
                filtrat();
                var inputFunction = function (callback) {
                    filtre_observa.forEach(function (element, index) {
                        callback({
                            espècie: element.nombre_especie,
                            mes: element.mes,
                            quinzena: element.quinzena
                        });
                    });
                };
        
               $("#myChart3").pivot(inputFunction, {
                    rows: ["espècie"],
                    cols: ["mes","quinzena"],
                   renderer: heatmap,
                    sorters: {
                        mes: $.pivotUtilities.sortAs(
                                ["Març","Abril", "Maig",
                                "Juny", "Juliol",
                                "Agost", "Setembre", "Octubre","Novembre"])
                    }
                    
                });

            }, 
        error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
       dataType: "json"
    });
    
//document.getElementById("3").style.display='block';
}
    