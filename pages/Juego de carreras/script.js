 const score=document.querySelector('.score');
            const startScreen=document.querySelector('.startScreen');
            const gameArea=document.querySelector('.gameArea');
            /*console.log(gameArea);*/
            startScreen.addEventListener('click',start);
            let player={speed:5,score:0};
            let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false}

            document.addEventListener('keydown',keyDown);
            document.addEventListener('keyup',keyUp);

 /** Esta función se utiliza para manejar el evento de presionar una tecla en el teclado.
  *
  * @param e
  */
            function keyDown(e){
                e.preventDefault();
                keys[e.key]=true;
            }

            /** Esta función se utiliza para manejar el evento de soltar una tecla en el teclado.
             *
             *
             * */
            function keyUp(e){
                e.preventDefault();
                keys[e.key]=false;
            }

 /**
  * esta función determina si dos elementos HTML se están colisionando en la página mediante la comparación de sus rectángulos delimitadores.
  */
            function isCollide(a,b){
                aRect=a.getBoundingClientRect();
                bRect=b.getBoundingClientRect();
                return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
            }

 /**
  * Esta función mueve las líneas hacia abajo en la página y, cuando alcanzan una posición determinada, las mueve hacia arriba para crear un efecto de bucle continuo. La velocidad del movimiento está determinada por la propiedad "speed" del objeto "player".
  */
            function moveLines(){
                let lines=document.querySelectorAll('.lines');
                lines.forEach(function(item){
                    if(item.y >=650){
                        item.y-=740;
                    }
                    item.y+=player.speed;
                    item.style.top=item.y+"px";
                })
            }

 /**
  * Esta función se utiliza para finalizar el juego y mostrar un mensaje de fin de juego en la pantalla.
  */
            function endGame(){
                player.start=false;
                startScreen.classList.remove('hide');
                startScreen.innerHTML="Fin del juego <br> Puntuación final:"+player.score+" "+"<br>Pulsa de nuevo para volver a empezar";
            }


 /**
  * Esta función se utiliza para mover los elementos enemigos en la pantalla del juego, detectar colisiones con el coche y realizar acciones en consecuencia.
  */

 function moveEnemy(car) {
     let enemy = document.querySelectorAll('.enemy');
     enemy.forEach(function (item) {
         if (isCollide(car, item)) {
             console.log("Bang!");
             endGame();
         }
         if (item.y >= 750) {
             item.y = -300;
             item.style.left = Math.floor(Math.random() * 350) + "px";
         }
         item.y += player.speed;
         item.style.top = item.y + "px";
         item.style.transform = "rotate(0deg)"; // Modificación para que todos los autos vayan en la misma dirección
     });
 }



 /**
  * Esta función se utiliza para controlar el flujo de juego y gestionar el movimiento del coche del jugador, las líneas y los enemigos en la pantalla del juego.
  */
 function gamePlay(){
                console.log("here we go");
                let car=document.querySelector('.car');
                let road=gameArea.getBoundingClientRect();
                /*console.log(road);*/
                if(player.start){
                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y>(road.top+70)){
                        player.y-=player.speed
                    }
                    if(keys.ArrowDown && player.y<(road.bottom-85)){
                        player.y+=player.speed
                    }
                    if(keys.ArrowLeft && player.x>0 ){
                        player.x-=player.speed
                    }
                    if(keys.ArrowRight && player.x<(road.width-50)){
                        player.x+=player.speed
                    }
                    car.style.top=player.y+"px";
                    car.style.left=player.x+"px";
                    window.requestAnimationFrame(gamePlay);
                    console.log(player.score++);
                    player.score++;
                    let ps=player.score-1;
                    score.innerText="Score: "+ps;
                }
            }


 /**
  * Esta función se utiliza para iniciar el juego y configurar la pantalla del juego con líneas, el coche del jugador y los coches enemigos.
  */
            function start(){
                startScreen.classList.add('hide');
                gameArea.innerHTML="";
                player.start=true;
                player.score=0;
                window.requestAnimationFrame(gamePlay);

                for(x=0;x<5;x++){
                    let roadLine=document.createElement('div');
                    roadLine.setAttribute('class','lines');
                    roadLine.y=(x*150);
                    roadLine.style.top=roadLine.y+"px";
                    gameArea.appendChild(roadLine);
                }

                let car=document.createElement('div');
                car.setAttribute('class','car');
                gameArea.appendChild(car);

                player.x=car.offsetLeft;
                player.y=car.offsetTop;



                for(x=0;x<3;x++){
                    let enemyCar=document.createElement('div');
                    enemyCar.setAttribute('class','enemy');
                    enemyCar.y=((x+1)*350)*-1;
                    enemyCar.style.top=enemyCar.y+"px";
                    enemyCar.style.backgroundColor=randomColor();
                    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
                    gameArea.appendChild(enemyCar);
                }


            }

 /**
  * Esta función se utiliza para generar un color hexadecimal aleatorio.
  * @returns {string}
  */
            function randomColor(){
                function c(){
                    let hex=Math.floor(Math.random()*256).toString(16);
                    return ("0"+String(hex)).substr(-2);
                }
                return "#"+c()+c()+c();
            }