 //inicializacion de variables
 let tarjetasDestapadas = 0;
 let tarjeta1 = null;
 let tarjeta2 = null;
 let primerResultado = null;
 let segundoResultado = null;
 let movimientos = 0;
 let aciertos = 0;
 let temporizador = false;
 let timer = 30;
 let timerInicial = 30;
 let tiempoRegresivoid = null;

 let winAudio = new Audio('./sounds/win.wav');
 let loseAudio = new Audio('./sounds/lose.wav');
 let clickAudio = new Audio('./sounds/click.wav');
 let rightAudio =new Audio('./sounds/right.wav');
 let wrongAudio = new Audio('./sounds/wrong.wav');
 
 //apuntando a documento HTML
 let mostrarMovimientos = document.getElementById('movimientos');
 let mostrarAciertos = document.getElementById('aciertos');
 let mostrarTiempo = document.getElementById('t-restante');
 //generación de numeros aleatorios
 let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
 numeros = numeros.sort(() => {return Math.random() - 0.5});
 console.log(numeros);
 
 //funciones
 function contarTiempo() {
     tiempoRegresivoid = setInterval(() => {
         if (timer > 0) {
             timer--;
             mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
         } else {
             clearInterval(tiempoRegresivoid);
             bloquearTarjetas();
             loseAudio.play();
         }
     }, 1000);
 }
 
 
 function bloquearTarjetas(){
     for(let i=0;i<=15;i++){
         let tarjetaBloqueada = document.getElementById(i);
         tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
         tarjetaBloqueada.disabled = true;
     }
 }
 //funcion principal
 function destapar(id){
     if(temporizador == false){
         contarTiempo();
         temporizador = true;
     }
 
     tarjetasDestapadas++;
     console.log(tarjetasDestapadas);
 
     if(tarjetasDestapadas == 1){
         //mostrar primer numero
         tarjeta1 = document.getElementById(id);
         primerResultado = numeros[id];
         tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`; //asociacion del id con los numeros del arreglo
         clickAudio.play();
         //deshabilitar el boton activado
         tarjeta1.disabled = true;
     } else if(tarjetasDestapadas == 2){
         //mostrar segundo numero
         tarjeta2 = document.getElementById(id);
         segundoResultado = numeros[id];
         tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`; //asociacion del id con los numeros del arreglo
 
         //deshabilitar el boton activado
         tarjeta2.disabled = true;
 
         //incrementar movimientos
         movimientos++;
         mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
 
         if(primerResultado == segundoResultado){
             //colocar en cero las tarjetas destapadas
             tarjetasDestapadas = 0;
             //aumentar aciertos
             aciertos++;
             mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();
             if(aciertos == 8){
                winAudio.play();
                 clearInterval(tiempoRegresivoid);
                 mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                 mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
                 mostrarTiempo.innerHTML = `Fantástico! 🎉 Solo demoraste ${timerInicial - timer} segundos`;
             }
         }else{
             //mostrar momentaneamente valores y volver a tapar
             wrongAudio.play();
             setTimeout(()=>{
                 tarjeta1.innerHTML = ' ';
                 tarjeta2.innerHTML = ' ';
                 tarjeta1.disabled = false;
                 tarjeta2.disabled = false;
                 tarjetasDestapadas = 0;
             }, 800);
         }
     }
 }
 function restartGame() {
    clearInterval(tiempoRegresivoid);
    temporizador = false;
    timer = timerInicial;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    // Restablecer variables y tarjetas

    // Habilitar y limpiar todas las tarjetas
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}


