function iniciarJogo(velSnake, idPonto) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    document.addEventListener("keydown", function(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                velocidadeX = -1;
                velocidadeY = 0;
                break;
            case 38:
                velocidadeY = -1;
                velocidadeX = 0;
                break;
            case 39:
                velocidadeX = 1;
                velocidadeY = 0;
                break;
            case 40:
                velocidadeY = 1;
                velocidadeX = 0
                break;
        }
    });

    setInterval(jogo, velSnake); //DETERMINA A VELOCIDADE DA snake

}

var posicaoX = 10;
var posicaoY = 10;
var comerX = 6;
var comerY = 6;
var velocidadeX = 0;
var velocidadeY = 0;
var grid = 20;
var snake = []; //vetor snake
var tam = 5; // numero de blocos da snake
var bordaX = 50; //limite da borda width
var bordaY = 25; //limite da borda height
var velSnake = 0; //velocidade snake
var pontuacaoJogador = 0; //pontuação

function jogo() {
    posicaoX += velocidadeX;
    posicaoY += velocidadeY;

    console.log(posicaoX);
    if (posicaoX < 0) {
        posicaoX = bordaX;
    }
    if (posicaoX > bordaX) {
        posicaoX = 0;
    }
    if (posicaoY < 0) {
        posicaoY = bordaY;
    }
    if (posicaoY > bordaY) {
        posicaoY = 0;
    }


    context.fillStyle = "black"; // cor do background - preto opacity
    context.fillRect(0, 0, canvas.width, canvas.height);



    context.fillStyle = "white"; // cor da snake - preto
    for (var i = 0; i < snake.length; i++) {
        context.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
        if (snake[i].x == posicaoX && snake[i].y == posicaoY) {
            tam = 5;
        }
    }

    snake.push({
        x: posicaoX,
        y: posicaoY
    });
    while (snake.length > tam) {
        snake.shift();
    }

    context.fillStyle = "red"; // cor da maçã
    context.fillRect(comerX * grid, comerY * grid, grid - 1, grid - 1);

    if (posicaoX == comerX && posicaoY == comerY) {
        atualizarTotalPontos("totalPontos");
        tam++;
        comerX = Math.floor(Math.random() * grid);
        comerY = Math.floor(Math.random() * grid);
    }

}


function atualizarTotalPontos(idCampo) {
    ++document.getElementById(idCampo).innerHTML;
    //function atualizarTotalPontos(idCampo)
    //localStorage.setItem("totalPontos", ++document.getElementById(idCampo).innerHTML)
}

function carregarTotalPontos(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalPontos = localStorage.getItem("totalPontos");
        if (totalPontos == null) totalPontos = 0;
        document.getElementById(idCampo).innerHTML = totalPontos;
    } else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}