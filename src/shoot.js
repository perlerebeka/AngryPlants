import { player } from "./player.js";

class WaterDrop {
    constructor(x, y, direction) {
        this.x = x;  // A vízcsepp kiinduló x pozíciója
        this.y = y;  // A vízcsepp kiinduló y pozíciója
        this.direction = direction;  // A vízcsepp iránya (jobb vagy bal)
        this.speed = 5;  // Sebesség
        this.size = 7;  // A vízcsepp mérete
    }

    move() {
        this.x += this.speed * this.direction;  // A vízcsepp elmozdul a kívánt irányba
    }
}

let waterDrops = [];  // A kilőtt vízcseppek tárolása

function handleSpacePress() {
    let direction = player.playerFacingRight ? 1 : -1;  // Irányba lő
    let newDrop = new WaterDrop(player.x + (player.playerFacingRight ? player.width : 0), player.y + player.height / 1.45, direction);
    waterDrops.push(newDrop);  // Új vízcsepp hozzáadása
}

console.log(waterDrops);
function updateWaterDrops() {
    for (let i = 0; i < waterDrops.length; i++) {
        waterDrops[i].move();  // Minden vízcsepp pozíciójának frissítése
    }
}
function drawWaterDrops(ctx) {
    ctx.fillStyle = "lightblue";  // A vízcsepp színe
    for (let i = 0; i < waterDrops.length; i++) {
        ctx.fillRect(waterDrops[i].x, waterDrops[i].y, waterDrops[i].size, waterDrops[i].size);
    }
}

export { WaterDrop, waterDrops, handleSpacePress, updateWaterDrops, drawWaterDrops };
