listItems="";
listAnys="";
listEspecies="";
function parcs(){
    
    $.ajax({
        type:"GET", 
        url: "parcs.jsp", 
        success: function(data) {
                parc = data;
                listItems += '<option selected="selected" value="-">Tots els parcs i platges </option>';
				listItems += '<option value="parcs">Tots els parcs</option>';
				listItems += '<option value="platges">Totes les platges</option>';
                for (var i = 0; i < parc.length; i++) {
                    listItems += '<option value="' + parc[i].nombre_ubicacion + '">' + parc[i].nombre_ubicacion + '</option>';
                }
                $("#area").html(listItems);
            }, 
        error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
       dataType: "json"
    });
}


function anys(){
    
    $.ajax({
        type:"GET", 
        url: "anys.jsp", 
        success: function(data) {
                anyos = data;
                listAnys += '<option selected="selected" value="-">Tots els anys</option>';
                for (var i = 0; i < anyos.length; i++) {
                    listAnys += '<option value="' + anyos[i].year + '">' + anyos[i].year + '</option>';
                }
                $("#fecha").html(listAnys);

            }, 
        error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
       dataType: "json"
    });
}
function especies(){
    
    $.ajax({
        type:"GET", 
        url: "especies.jsp", 
        success: function(data) {
                espec = data;
                listEspecies += '<option value="-">Totes les espècies</option>';
                for (var i = 0; i < espec.length; i++) {
                    listEspecies += '<option value="' + espec[i].nombre_especie + '">' + espec[i].nom + '</option>';
                }
                $("#especie").html(listEspecies);
               // grafic1();
                grafic2();
                grafic3();
                setTimeout("grafic1()",1000);
            }, 
        error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
       dataType: "json"
    });
}

function DistinctRecords(MYJSON,prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
   })
  }


function filtrat(){
    if (document.getElementById("fecha").value != '-') {
        filtre_observa = observa.filter(element => element.year == document.getElementById("fecha").value );
      } else {
          filtre_observa = observa;
      }

    if (document.getElementById("area").value != '-') {
        if (document.getElementById("area").value == 'parcs') {
            filtre_observa = filtre_observa.filter(element => element.nombre_ubicacion.startsWith('Platja') == false);		
        } else if (document.getElementById("area").value == 'platges') {
            filtre_observa = filtre_observa.filter(element => element.nombre_ubicacion.startsWith('Platja'));	
        } else {
            filtre_observa = filtre_observa.filter(element => element.nombre_ubicacion == document.getElementById("area").value );
        }
    } else {
        filtre_observa = filtre_observa;
    }
    if (document.getElementById("especie").value != '-') {
        filtre_observa = filtre_observa.filter(element => element.nombre_especie == document.getElementById("especie").value );
      } else {
          filtre_observa = filtre_observa;
      }
}

function unic(){
    const groupArray = (filtre_observa) => {
        // create map
        let map = new Map()
        for (let i = 0; i < filtre_observa.length; i++) {
           const s = JSON.stringify(filtre_observa[i]);
           if (!map.has(s)) {
              map.set(s, {
                 mes: filtre_observa[i].mes,
                 quinzena: filtre_observa[i].quinzena,
                 any : filtre_observa[i].any,
                 parc: filtre_observa[i].parc,
                 autor_id: filtre_observa[i].autor_id,
                 count: 1,
              });
           } else {
              map.get(s).count++;
           }
        }
        const res = Array.from(map.values())
        console.log(res);
     };

}
