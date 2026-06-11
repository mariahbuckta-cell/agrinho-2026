const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pontos = 0;

// Configurações do Jogador (Trator)
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    w: 50,
    h: 30,
    speed: 5,
    color: "#D32F2F" // Vermelho trator
};

// Itens no mapa (Árvores para plantar/cuidar)
let itens = [
    { x: 200, y: 150, w: 40, h: 40, coletado: false },
    { x: 600, y: 400, w: 40, h: 40, coletado: false },
    { x: 100, y: 500, w: 40, h: 40, coletado: false }
];

const teclas = {};

window.addEventListener("keydown", (e) => teclas[e.code] = true);
window.addEventListener("keyup", (e) => teclas[e.code] = false);

function atualizar() {
    // Movimento
    if (teclas["ArrowUp"] || teclas["KeyW"]) player.y -= player.speed;
    if (teclas["ArrowDown"] || teclas["KeyS"]) player.y += player.speed;
    if (teclas["ArrowLeft"] || teclas["KeyA"]) player.x -= player.speed;
    if (teclas["ArrowRight"] || teclas["KeyD"]) player.x += player.speed;

    // Checar colisão com itens
    itens.forEach(item => {
        if (!item.coletado &&
            player.x < item.x + item.w &&
            player.x + player.w > item.x &&
            player.y < item.y + item.h &&
            player.y + player.h > item.y) {
            
            item.coletado = true;
            pontos += 10;
            scoreEl.innerText = pontos;
        }
    });
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar Itens (Árvores)
    ctx.fillStyle = "#2E7D32";
    itens.forEach(item => {
        if (!item.coletado) {
            ctx.fillRect(item.x, item.y, item.w, item.h); // Corpo da árvore
            ctx.fillStyle = "white";
            ctx.fillText("PLANTAR", item.x, item.y - 5);
            ctx.fillStyle = "#2E7D32";
        }
    });

    // Desenhar Jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    
    // Detalhe do trator (rodas)
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y - 5, 15, 5);
    ctx.fillRect(player.x + 35, player.y - 5, 15, 5);
    ctx.fillRect(player.x, player.y + 30, 15, 5);
    ctx.fillRect(player.x + 35, player.y + 30, 15, 5);

    requestAnimationFrame(loop);
}

function loop() {
    atualizar();
    desenhar();
}

loop();
