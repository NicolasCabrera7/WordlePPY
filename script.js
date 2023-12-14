const endpoint = "https://random-word-api.herokuapp.com/word?length=5&&lang=es";
let intentos = 6;
let diccionario = ['MANZANA', 'PERA', 'UVA', 'AGUACATE', 'SANDIA', 'BANANA']
let palabra;

fetch(endpoint).then((response)=>{
    response.json().then((data)=>{
        console.log(data[0]);
        palabra =  data[0].toUpperCase();
    })
});

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const GRID = document.getElementById("grid");
const ROW = document.createElement('div');
ROW.className = 'row';



function intentar(){
    const INTENTO = leerIntento();
    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if(INTENTO[i] == undefined){
            SPAN.innerHTML = '-';
            SPAN.style.backgroundColor = 'grey';
        }else if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        }else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        }else {//GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE!😖</h1>")
    }

}


function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}


function leerIntento(){
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase(); 
    return intento;
}




