import { player, updatePlayer } from "./player.js";
import { keys, setupInputListeners } from "./input.js";
import { handleSpacePress, updateWaterDrops, drawWaterDrops } from "./shoot.js";
import { typeWriter} from './story.js';

let gameMusic = new Audio('assets/audio/music/gameMusic.mp3');
gameMusic.loop = true; 
gameMusic.volume = 0.1; 

let shootEffect = new Audio('assets/audio/sound_effects/shootEffect.wav');
shootEffect.volume = 0.5; 


const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startMenu');
const playButton = document.getElementById('playButton');
const playScreen = document.getElementById('storyMenu');
const backButton = document.getElementById('backButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Elrejti a kezdőképernyőt
    playScreen.style.display = 'block'; // Megjeleníti a történeti képernyőt
    typeWriter(); // Elindítja a szöveg gépelését
});
playButton.addEventListener('click', () => {
    playScreen.style.display = 'none'; // Elrejti a kezdőképernyőt
    canvas.style.display = 'block'; // Megjeleníti a játék vásznat
    gameMusic.play(); // Játékzene lejátszása
});
backButton.addEventListener('click', () => {
    playScreen.style.display = 'none'; // Elrejti a történeti képernyőt
    startScreen.style.display = 'block'; // Megjeleníti a kezdőképernyőt
});

setupInputListeners();

canvas.width = 1000;
canvas.height = 500;

let tile = new Image();
tile.src = 'assets/tile/tile_0001.png';

let tile_end = new Image();
tile_end.src = 'assets/tile/tile_0003.png';

let tile_mid = new Image();
tile_mid.src = 'assets/tile/tile_0002.png';

let background = new Image();
background.src = 'assets/background/tile_0015.png';

let character = new Image();
character.src = 'assets/char/Char.png';

ctx.imageSmoothingEnabled = false;

// Game loop

const spriteWidth = 16;
const spriteHeight = 16;

function drawPlatforms() {
    ctx.drawImage(tile, 200, 345, 50, 50); // Bal szélső platform
    ctx.drawImage(tile_mid, 250, 345, 50, 50); // Középső platform
    ctx.drawImage(tile_end, 300, 345, 50, 50); // Jobb szélső platform

    ctx.drawImage(tile, 480, 280, 50, 50); // Bal szélső platform
    ctx.drawImage(tile_mid, 530, 280, 50, 50); // Középső platform
    ctx.drawImage(tile_end, 580, 280, 50, 50); // Jobb szélső platform

}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Háttér kirajzolása
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Platformok kirajzolása
    ctx.drawImage(tile, 0, 450, 50, 50);
    for (let i = 0; i < 18; i++) {
        ctx.drawImage(tile_mid, 50 + i * 50, 450, 50, 50);
    }
    ctx.drawImage(tile_end, 950, 450, 50, 50);
    drawPlatforms();

    // Karakter frissítése
    updatePlayer();

    if (keys.space) {
        handleSpacePress();
        shootEffect.currentTime = 0;
        shootEffect.play();
        keys.space = false; // hogy ne spam-eljen
    }

    // Karakter kirajzolása a megfelelő sprittal
    ctx.drawImage(
        player.currentSprite,
        player.frameX * spriteWidth, 0,
        spriteWidth, spriteHeight,
        player.x, player.y,
        player.width, player.height
    );

    updateWaterDrops();
    drawWaterDrops(ctx);


    requestAnimationFrame(gameLoop);
}

character.onload = gameLoop;



