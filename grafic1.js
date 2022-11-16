function grafic1(){
  $.getJSON("observadors.jsp?especie="+especie.value, function(data){
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
    grafic1b();
  });
}

function grafic1b() {    
   
    $.ajax({
        type:"GET", 
        url: "mostrejos_temps.jsp?especie="+especie.value, 
        success: function(data) {
			mostrejos_temps = data;
                if (document.getElementById("fecha").value != '-') {
			      filtre_most_temps = mostrejos_temps.filter(element => element.year == document.getElementById("fecha").value );
			    } else {
			        filtre_most_temps = mostrejos_temps;
			    }
			     if (document.getElementById("area").value != '-') {
			            if (document.getElementById("area").value == 'parcs') {
							filtre_most_temps = filtre_most_temps.filter(element => element.nombre_ubicacion.startsWith('Parc'));		
						} else if (document.getElementById("area").value == 'platges') {
							filtre_most_temps = filtre_most_temps.filter(element => element.nombre_ubicacion.startsWith('Platja'));	
						} else {
							filtre_most_temps = filtre_most_temps.filter(element => element.nombre_ubicacion == document.getElementById("area").value );
						}
			        } else {
			            filtre_most_temps = filtre_most_temps;
			        }
			
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
                                data:_.countBy(filtre_observadors, function(filtre_observadors) { return filtre_observadors.mes + " " + filtre_observadors.quinzena ; }),
                                borderColor: 'rgba(75, 192, 192,0)',
                                pointRadius:5,
                                pointBackgroundColor:'rgb(255,0,0)'
                                
                            },
                            {
                              type: 'bar',
                              label: "Mostrejos",
                              yAxisID: 'B',
                              data: _.countBy(filtre_most_temps, function(filtre_most_temps) { return filtre_most_temps.mes + " " + filtre_most_temps.quinzena ; }),
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
                                    text: ["Nombre de mostrejos"]
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
    

