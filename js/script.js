/*
## Descripción
El juego genera un número aleatorio del 1 al 3 y presenta una cuenta atrás de 5 segundos. Después de la cuenta atrás, 
compara el número aleatorio con el número introducido por el usuario.
 Si coinciden, se muestra un mensaje de "¡Has salvado el mundo!", de lo contrario, se muestra 
 "La bomba ha estallado". En ambos casos tendrá que salir el núemro elegido y junto con el número correcto 
 (el generado aleatoriamente). No se sabrá que número es hasta que pasen 5 segundos.

## Instrucciones

1. Abre el archivo `index.html` en tu navegador.
2. Introduce un número del 1 al 3 en el campo de entrada.
3. El juego se iniciará automáticamente con una cuenta atrás de 5 segundos.
4. Después de la cuenta atrás, el juego evaluará el número introducido.
5. Se mostrará un mensaje indicando si has salvado el mundo o si la bomba ha estallado.

## Reiniciar el Juego

Puedes reiniciar el juego en cualquier momento haciendo clic en el botón "Reiniciar Juego". Esto comenzará una nueva cuenta atrás y permitirá que ingreses otro número.

## Estilos

Los estilos del juego están definidos en el archivo `styles.css`. Puedes personalizar estos estilos según tus preferencias.

Debe quedar algo similar a esto
![boom](./img/boom.png)



## Pistas
- Puedes usar `setTimeout()` para generar la asincronía de 5 segundos
- Puedes usar `setInterval()` para generar el contador de 5 segundos (recuerda que es del 5 al 0, por tanto el intervalo debería ser uno más) 5, 4, 3, 2, 1, 0 ...
- Usa promesas para una vez pasado ese tiempo devuelva el resultado y puedas trabajar con él
- Crea un botón de reinicio del juego voviendo a iniciar la función inicial o reiniciando la página al pulsarlo.
 */

//Primero tengo que saber si el usuario ha introducido un número, por lo que tengo que recoger el valor del número. Hay que recoger el valor de <input>
const initGame = document.getElementById('userInput');//devuelve un Elementobjeto que representa el input el valor 
const initGame2 = document.getElementsByTagName('body')[0]; //devuelve un Elementobjeto que representa el body
const COUNTDOWNHTML = document.getElementById('countdown');
const RESULT=document.getElementById('result');
let numberGame // Variable para el juego introducida por le usuario
let number //Variable aleatoria
let TIMER=6000 //Tiempo de duración de la ejecución
const TIMINTERVAL=1000 //Intervalos para sacar el resultado
let COUNTDOWN=TIMER/1000; //Cuanta a tras en función del tiempo


initGame2.addEventListener("click", () => { //Evento mediante Click por el usuario
    numberGame = initGame.value;//obtenemos el valor introducido por el usuario
    if(numberGame!=0){
        triggerBomb(numberGame); //Activamos la bomba y le pasamos el dato
    }
})

initGame.addEventListener('keyup',(e)=>{
    if((e.code=='Enter')||(e.code=='NumpadEnter')){//Evento mediante entrada de teclado por el usuario
        numberGame = initGame.value;//obtenemos el valor introducido por el usuario
        if(numberGame!=0){
            triggerBomb(numberGame); //Activamos la bomba y le pasamos el dato
        }
    }
})

//Activar la bomba
function triggerBomb(){
    COUNTDOWN=TIMER/1000;
    TIMER=6000
    if(numberGame!=0){
       let inter= setInterval(()=>{
            console.log(numberGame)
            COUNTDOWNHTML.innerHTML=`<p>Cuenta atrás: ${COUNTDOWN-=1} (sec)</p>`
            if((COUNTDOWN==0)||(numberGame==0)){
                clearInterval(inter)
            }
        }, TIMINTERVAL);
    }
        const bombaPromesa=new Promise ((resolve)=>{    
        let time=setTimeout(()=>{
            number=Math.floor(Math.random()*(4-1)+1);
            resolve(number)
            if((COUNTDOWN==0)||(numberGame==0)){
                clearTimeout(time)
            }
        },TIMER);
    })

    bombaPromesa.then((numcom)=>{
        if(numberGame!=0){
        if((numcom==numberGame)==true){
            RESULT.innerHTML=`
            <p id=positivo><strong>FELICIDADES ERES MEJOR QUE 007 Y ETHAN HUNT JUNTOS</strong></p>
            <p id=positivo><strong>¡Has salvado el mundo!</strong></p>
            <img src="https://media.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=790b7611sjxbcoa4asqug6yttqkx51ap15fv749c1kd0x1vk&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
            <p>LA MAQUINA ELIGIÓ EL NÚMERO ${numcom}</p>
            `;
        }
        else{
            RESULT.innerHTML=`
            <p id=negativo><strong>LA LIASTE... HAS CONDENADO AL MUNDO</strong></p>
            <p id=negativo><strong>La bomba ha estallado</strong></p>
            <img src=https://media.giphy.com/media/1k4socTaHynIaLZYSQ/giphy.gif?cid=790b7611stzowdkmm80d7h83cxjfufh2nzidc530skik7h0o&ep=v1_gifs_search&rid=giphy.gif&ct=g/>
            <p>LA MAQUINA ELIGIÓ EL NÚMERO ${numcom}</p>
            `;
        }
        numberGame=0;
    }
    })
       
}

//Reset para cuando la cuenta atras termine el valor vuelva a ser 0
const reset=document.getElementById('restart')
reset.addEventListener('click',()=>{
        initGame.value=0;
        numberGame=0;
        COUNTDOWNHTML.innerHTML=""
        RESULT.innerHTML="";
    })


//Si el la bomba estalla o el usuario acierta tendré que resetar el número a 0 (valor inicial para que el juego no empiece)

//Si el número es distinto de 0 tendremos que comenzar con la cuenta a tras y hacer que el programa de un valor aleatorio a la bomba