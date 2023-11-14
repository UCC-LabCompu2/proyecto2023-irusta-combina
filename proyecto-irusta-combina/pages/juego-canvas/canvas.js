const canvas = document.getElementById('drawing-board');
        const toolbar = document.getElementById('toolbar');
        const ctx = canvas.getContext('2d');

        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;

        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;

        // Cargar la imagen en el canvas
        const carImage = new Image();
        carImage.src = 'f1-car2.png';

        let isPainting = false;
        let lineWidth = 5;
        let startX;
        let startY;

        // Al hacer click se borra el dibujo
        toolbar.addEventListener('click', e => {
            if (e.target.id === 'clear') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });

        //Al hacer click se puede cambiar el color
        toolbar.addEventListener('change', e => {
            if (e.target.id === 'color') {
                ctx.strokeStyle = e.target.value;
            }
            //En este el espesor del lapiz
            if (e.target.id === 'Espesor') {
                lineWidth = e.target.value;
            }
        });

        const draw = (e) => {
            if (!isPainting) {
                return;
            }

            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
            ctx.stroke();
        }
        //Estos 3 eventos sirven para detectar cuando el usuario esta dibujando y se llama a la funcion "draw"
        canvas.addEventListener('mousedown', (e) => {
            isPainting = true;
            startX = e.clientX;
            startY = e.clientY;
        });

        canvas.addEventListener('mouseup', e => {
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });

        canvas.addEventListener('mousemove', draw);

        //esta se encarga de posicionar la imagen y el tiempo que se muestra
        const animate = () => {
            let posX = (canvas.width - 200) / 2;
            const startYPos = (canvas.height - 150) / 2;
            const animationDuration = 4000; // 4 segundos
            const animationInterval = 16.67;

            const animateFrame = () => {
                // Borrar el contenido del canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Dibujar la imagen en la posición actual
                ctx.drawImage(carImage, posX, startYPos, 200, 150);

                // Actualizar la posición para el siguiente lugar
                const elapsedTime = Date.now() - startTime;
                posX = (canvas.width - 200) * (elapsedTime / animationDuration);

                // Detener la animación después de 4 segundos
                if (posX >= canvas.width - 200) {
                    clearInterval(animationIntervalId);
                }
            };

            // Iniciar el contador de tiempo
            const startTime = Date.now();

            // Iniciar la animación utilizando setInterval
            const animationIntervalId = setInterval(animateFrame, animationInterval);
        };

        // Al hacer clic en el botón "Iniciar animación"
        document.getElementById('startAnimation').addEventListener('click', () => {
            animate();
        });