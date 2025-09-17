import { keys } from "./input.js";
import { platforms } from './platforms.js';

export const player = {
    x: 0,
    y: 380,
    width: 80,
    height: 80,
    speed: 4,
    velocityY: 0,
    gravity: 0.5,
    onGround: true,
    currentSprite: new Image(),
    spriteIdleRight: new Image(),
    spriteIdleLeft: new Image(),
    spriteWalkRight: new Image(),
    spriteWalkLeft: new Image(),
    spriteJumpRight: new Image(),
    spriteJumpLeft: new Image(),
    frameX: 0,
    totalFrames: 3,
    frameDelay: 10,
    frameCounter: 0,
    playerFacingRight: true
};

// Sprite képek betöltése
player.spriteIdleRight.src = "assets/char/Char.png";
player.spriteIdleLeft.src = "assets/char/Idle_left.png";
player.spriteWalkRight.src = "assets/char/walk.png";
player.spriteWalkLeft.src = "assets/char/Walk_left.png";
player.spriteJumpRight.src = "assets/char/Jump.png";
player.spriteJumpLeft.src = "assets/char/Jump_left.png";

// Alapértelmezett sprite beállítása
player.currentSprite = player.spriteIdleRight;

let jumpEffect = new Audio('assets/audio/sound_effects/jumpEffect.wav');
jumpEffect.volume = 0.4;

let walkEffect = new Audio('assets/audio/sound_effects/walkEffect.wav');
walkEffect.volume = 0.2;

let isWalking = false;
let walkSoundTimer = 0;

function playWalkEffect() {
    const now = Date.now();
    if (now - walkSoundTimer > 250) {  
        walkSoundTimer = now;
        walkEffect.currentTime = 0;
        walkEffect.play();
    }
}

// Karakter mozgás és animáció frissítése
export function updatePlayer() {
    if (keys.d) {
        player.x += player.speed;
        player.currentSprite = player.spriteWalkRight;
        player.playerFacingRight = true;

        if (player.onGround) playWalkEffect();

    } else if (keys.a) {
        player.x -= player.speed;
        player.currentSprite = player.spriteWalkLeft;
        player.playerFacingRight = false;

        if (player.onGround) playWalkEffect();

    }
    else {
        player.currentSprite = player.playerFacingRight ? player.spriteIdleRight : player.spriteIdleLeft;
        isWalking = false;
    }
    if (keys.w && player.onGround) {
        player.velocityY = -11;  // Ugrás
        jumpEffect.currentTime = 0;
        jumpEffect.play();
        player.onGround = false;
        player.currentSprite = player.spriteJumpRight;
    }

    if (!player.onGround) {
        player.velocityY += player.gravity; // Gravitáció
        player.y += player.velocityY;

    }
    // Platformokkal való ütközés ellenőrzése
    let onAnyPlatform = false;

    for (let plat of platforms) {
        const isFallingOntoPlatform =
            player.y + player.height <= plat.y && 
            player.y + player.height + player.velocityY >= plat.y && 
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.width;

        if (isFallingOntoPlatform) {
            player.y = plat.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
            onAnyPlatform = true;
            break;
        }
    }

    if (!onAnyPlatform) {
        if (player.y >= 380) {
            player.y = 380;
            player.velocityY = 0;
            player.onGround = true;
        } else {
            player.onGround = false;
        }
    }

    player.frameCounter++;
    if (player.frameCounter >= player.frameDelay) {
        player.frameX = (player.frameX + 1) % player.totalFrames;
        player.frameCounter = 0;
    }
}





