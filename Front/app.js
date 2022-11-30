let batteries = [];
let global = 1;
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

async function  updateTable(){
    i = 0;
    while(true){
   loadBatteries();
   await delay(1000);
   batteries = [];
    }
}
updateTable();

function loadBatteries(cbErr){
    console.log("Cargando baterias");
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
   xhr.open('GET', "https://iot-0.herokuapp.com/api/Batteries");     
    // 3. Enviar solicitud        
    xhr.setRequestHeader('Content-Type', 'application/json');
   xhr.send();        
    // 4. Una vez recibida la respuesta del servidor        
   xhr.onload = function () {        
       if (xhr.status == 200) { // analizar el estatus de la respuesta HTTP
        let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
        clear_div();
        global = 1;
        batteries.push(... datos);
        BatteryListToHTML(batteries);
        console.log(batteries);
        // Ejecutar algo si todo está correcto
       } else {
           // Ocurrió un error     
           alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
           cbErr();
           // ejecutar algo si error 
       }
   }
}

function cbErr(){
    $('#allBad').modal('show');
}

function clear_div(){
    document.getElementById("tablona").innerHTML = '';
    }


    function  batteryToHTML(battery){
        console.log(battery.Name);
        let html;
        if(global % 2 != 0){
            html = `<tr style="background-color: rgb(61, 61, 119);">
                    <td><div class="divRow">${global}</div></td>
                    <td><div class="divRow">${battery.Name}</div></td>
                    `
        }
        else{
            html = `<tr style="background-color: rgb(41, 41, 82));">
            <td><div class="divRow">${global}</div></td>
            <td><div class="divRow">${battery.Name}</div></td>
            `
        }

        if(battery.Percentage > 70 ){
            html+= `<td><div class="divRow greenPercentage">${battery.Percentage+"%"}</div></td>
                    <td><div class="divRow greenPercentage">${battery.Voltage+"V"}</div></td>
            `
        }
        else if(battery.Percentage > 30){
            html+= `<td><div class="divRow yellowPercentage">${battery.Percentage+"%"}</div></td>
                    <td><div class="divRow yellowPercentage">${battery.Voltage+"V"}</div></td>
            `
        }
        else {
            html+= `<td><div class="divRow redPercentage">${battery.Percentage+"%"}</div></td>
                    <td><div class="divRow redPercentage">${battery.Voltage+"V"}</div></td>

            `
        }
        if(battery.Temperature > 55 ){
            html+= `<td><div class="divRow redPercentage">${battery.Temperature+"°C"}</div></td>
            `
        }
        else if(battery.Temperature > 45){
            html+= `<td><div class="divRow yellowPercentage">${battery.Temperature+"°C"}</div></td>
            `
        }
        else {
            html+= `<td><div class="divRow greenPercentage">${battery.Temperature+"°C"}</div></td>
            `
        }
        html+= `<td><div class="divRow greenPercentage">${battery.Current+"A"}</div></td>
        `
        if(battery._id === "6375a27be89a77ac3dd4223c"){
            html +=`<td><div class="divRow">Activa</div></td>
            `
        }
        else{
            html += `<td><div class="divRow">Cargando</div></td>`
        }
        global ++;
        return html;
        }


        function BatteryListToHTML(listabatacas){
            let list =             
            `<tr style="background-color: rgb(52, 52, 104);">
            <th>ID</th>
            <th>Nombre</th>
            <th>Carga</th>
            <th>Voltaje</th>
            <th>Temperatura</th>
            <th>Corriente</th>
            <th>Status</th>
            </tr>
            `
            html = listabatacas.map(batteryToHTML).join('');
            document.getElementById("tablona").innerHTML=list+html;
            }
            

            