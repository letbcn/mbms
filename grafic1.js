function grafic1(){
  $.getJSON("observadors.jsp", function(data){
    observadors = data;
    if (document.getElementById("fecha").value != '-') {
      filtre_observadors = observadors.filter(element => element.year == document.getElementById("fecha").value );
    } else {
        filtre_observadors = observadors;
    }
     if (document.getElementById("area").value != '-') {
            if (document.getElementById("area").value == 'parcs') {
				filtre_observadors = filtre_observadors.filter(element => element.nombre_ubicacion.startsWith('Parc'));		
			} else if (document.getElementById("area").value == 'platges') {
				filtre_observadors = filtre_observadors.filter(element => element.nombre_ubicacion.startsWith('Platja'));	
			} else {
				filtre_observadors = filtre_observadors.filter(element => element.nombre_ubicacion == document.getElementById("area").value );
			}
        } else {
            filtre_observadors = filtre_observadors;
        }
    if (document.getElementById("especie").value != '-') {
		filtre_observadors = filtre_observadors.filter(element => element.nombre_especie == document.getElementById("especie").value );
    } else {
      filtre_observadors = filtre_observadors;
    }
    grafic1b();
  });
  /*$.ajax({
    type:"GET", 
    url: "observadors.jsp", 
    dataType: "json",
    success: function(data) {
      observadors = data;
      if (document.getElementById("fecha").value != '-') {
        filtre_observadors = observadors.filter(element => element.year == document.getElementById("fecha").value );
      } else {
          filtre_observadors = observadors;
      }
      if (document.getElementById("area").value != '-') {
          filtre_observadors = filtre_observadors.filter(element => element.parc == document.getElementById("area").value );
      } else {
          filtre_observadors = filtre_observadors;
      }
      if (document.getElementById("especie").value != '-') {
        filtre_observadors = filtre_observadors.filter(element => element.nombre_especie == document.getElementById("especie").value );
      } else {
        filtre_observadors = filtre_observadors;
      }
      grafic1b();
    }
  });*/
}

function grafic1b() {    
   
    $.ajax({
        type:"GET", 
        url: "mostrejos.jsp", 
        success: function(data) {
                observa = data;
                filtrat();
                const ctx = document.getElementById('myChart1').getContext('2d');
                ctx.canvas.width = 300;
                ctx.canvas.height = 300;
                myChart1 = new Chart(ctx, {
                    
                    data: {
                        labels: ["Març 1a quinzena","Març 2a quinzena","Abril 1a quinzena","Abril 2a quinzena","Maig 1a quinzena","Maig 2a quinzena","Juny 1a quinzena","Juny 2a quinzena","Juliol 1a quinzena","Juliol 2a quinzena","Agost 1a quinzena","Agost 2a quinzena","Setembre 1a quinzena","Setembre 2a quinzena","Octubre 1a quinzena","Octubre 2a quinzena","Novembre 1a quinzena"],
                        datasets: [
                            {
                                type: 'line',
                                label: "Voluntaris",
                                yAxisID: 'A',
                                data:_.countBy(filtre_observadors, function(data) { return data.mes + " " + data.quinzena ; }),
                                borderColor: 'rgba(75, 192, 192,0)',
                                pointRadius:5,
                                pointBackgroundColor:'rgb(255,0,0)'
                                
                            },
                            {
                              type: 'bar',
                              label: "Mostrejos",
                              yAxisID: 'B',
                              data: _.countBy(filtre_observa, function(data) { return data.mes + " " + data.quinzena ; }),
                              backgroundColor: 'rgba(146,168,80, 1)',
                              datalabels: {
                                  display:true,
                                  labels: {
                                    title: {
                                      font: {
                                        weight: 'bold',
                                        color:'white'
                                      }
                                    }
                                  }
                                }
                          }
                        ]
                    },
                    options: {
                        plugins: {
                            title:{
                                display: 'true',
                                text:"Gestió de dades"
                            },
                            legend:{
                                position:'bottom',
                                align:'right', 
                                display:false      
                            },
                            
                        },
                        scales: {
                            A: {
                              grid:{display:false},
                                type: 'linear',
                                position: 'left',
                                title: {
                                    display: true,
                                    text: ["Nombre de persones voluntàries"]
                                  },
                                beginAtZero: true,
                                ticks: {
                                  stepSize: 1
                                }
                                
                            },
                            B: {
                                type: 'linear',
                                position: 'right',
                                title: {
                                    display: true,
                                    text: ["Número de mostrejos"]
                                  },
                                  ticks: {
                                    stepSize: 1
                                  }
                            },
                            x: {
                              ticks: {
                                  autoSkip: false,
                                  maxRotation: 90,
                                  minRotation: 90,
                                  align:'start',
                                  font: {
                                    size: 10
                                    }
                              }
                            }
                        }
                    }
                });
            }, 
        error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
       dataType: "json"
    });
    
//

}
    

