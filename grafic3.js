function grafic3() {     
    $.ajax({
        type:"GET", 
        url: "observacions.jsp", 
        success: function(data) {
                var utils = $.pivotUtilities;
                var sortAs =  $.pivotUtilities.sortAs;
                var sum = $.pivotUtilities.aggregatorTemplates.sum;
                var numberFormat = $.pivotUtilities.numberFormat;
                var intFormat = numberFormat({digitsAfterDecimal: 0,thousandsSep:"."});
                var germanFormat = numberFormat({digitsAfterDecimal: 0},thousandsSep=",", decimalSep=".");
                var heatmap =  utils.renderers["Heatmap"];
                observa = data;
                filtrat();
                console.log(filtre_observa)
                var inputFunction = function (callback) {
                    filtre_observa.forEach(function (element, index) {
                        callback({
                            espècie: element.nombre_especie,
                            suma: element.suma,
                            mes: element.mes,
                            quinzena: element.quinzena
                        });
                    });
                };
               $("#myChart3").pivot(inputFunction, {
                    rows: ["espècie"],
                    cols: ["mes","quinzena"],
                    aggregator: sum(intFormat)(["suma"]),
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
    