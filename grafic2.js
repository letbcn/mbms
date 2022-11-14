function grafic2(){
    $.ajax({
      type:"GET", 
      url: "mostrejos.jsp", 
      dataType: "json",
      success: function(data) {
        mostrejos = data;
        if (document.getElementById("fecha").value != '-') {
          filtre_mostrejos = mostrejos.filter(element => element.year == document.getElementById("fecha").value );
        } else {
            filtre_mostrejos= mostrejos;
        }
        if (document.getElementById("area").value != '-') {
            if (document.getElementById("area").value == 'parcs') {
				filtre_mostrejos = filtre_mostrejos.filter(element => element.nombre_ubicacion.startsWith('Parc'));		
			} else if (document.getElementById("area").value == 'platges') {
				filtre_mostrejos = filtre_mostrejos.filter(element => element.nombre_ubicacion.startsWith('Platja'));	
			} else {
				filtre_mostrejos = filtre_mostrejos.filter(element => element.nombre_ubicacion == document.getElementById("area").value );
			}
        } else {
            filtre_mostrejos = filtre_mostrejos;
        }
		
        if (document.getElementById("especie").value != '-') {
          filtre_mostrejos = filtre_mostrejos.filter(element => element.nombre_especie == document.getElementById("especie").value );
        } else {
          filtre_mostrejos = filtre_mostrejos;
        }
   
        grafic2b();
      }
    });
  }

function grafic2b() {     
    $.ajax({
        type:"GET", 
        url: "observacions.jsp", 
        success: function(data) {
                observa = data;
                filtrat();
                const ctx2 = document.getElementById('myChart2').getContext('2d');
                ctx2.canvas.width = 300;
                ctx2.canvas.height = 240;
                most = _.countBy(filtre_mostrejos, function(data) { return data.nombre_especie ; });
                obs = _.countBy(filtre_observa, function(data) { return data.nombre_especie; });
                for (var [key, value] of Object.entries(obs)) {
                  for (var [key2, value2] of Object.entries(most)){
                    most[key] =  value/value2;
                  }
                }
                myChart2 = new Chart(ctx2, {
                    
                    data: {
                        labels: [],
                        datasets: [
                            {
                                type: 'line',
                                label: "Individus per mostreig",
                                yAxisID: 'A',
                                data:most,
                                borderColor: 'rgba(75, 192, 192,0)',
                                pointRadius:5,
                                pointBackgroundColor:'rgb(245, 167, 66)'
                                
                            },
                            {
                                type: 'bar',
                                label: "Individus",
                                yAxisID: 'B',
                                data: _.countBy(filtre_observa, function(data) { return data.nombre_especie; }),
                                backgroundColor: 'rgba(68,114,196, 1)',
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
                            },
                        ]
                    },
                    options: {
                        plugins: {
                            title:{
                                display: 'true',
                                text:"Seguiment d'espècies"
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
                                  position: 'right',
                                  title: {
                                      display: true,
                                      text: ["Individus per mostreig"]
                                    },
                                  beginAtZero: true,
                                  ticks: {
                                    stepSize: 1
                                  }
                                  
                              },
                           B: {
                                type: 'linear',
                                position: 'left',
                                title: {
                                    display: true,
                                    text: ["Nombre d'individus"]
                                  }
                            },
                            x: {
                              ticks: {
                                  autoSkip: false,
                                  maxRotation: 90,
                                  minRotation: 90,
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

//document.getElementById("2").style.display='block';
}
    