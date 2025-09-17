export const storyText =
            `For generations, the flowers of the Garden lived in peace.
             They were watered, loved and cared for.
            ...Then came the drought.
             Days turned into weeks. Weeks into months. Not a single drop.
             They withered. They waited.
            And eventually...
            They snapped.

            Now, enraged and bone-dry, the flowers have risen against their careless caretakers.
            The garden is no longer your friend — it’s a battlefield. \n
            Your task is to water the plants with your watergun so they can be happy again. \n
            Move with WASD and shoot with space.`;


const storyElement = document.getElementById('storyText');

storyElement.style.fontSize = "30px";
storyElement.style.color = "white";
storyElement.style.textAlign = "center";
storyElement.style.maxWidth = "800px"; 
storyElement.style.margin = "40px auto";

let typingSound = new Audio('assets/audio/sound_effects/keypressEffect.mp3');
typingSound.volume = 0.2;

let index = 0;
let typingSpeed = 40; // ms per character
let typing;

export function typeWriter() {
    typing = setInterval(() => {
        if (index < storyText.length) {
            storyElement.innerHTML += storyText.charAt(index);
            typingSound.play()
            index++;
        } else {
            clearInterval(typing);
            typingSound.pause(); // Megállítja a hangot, ha a szöveg végére ér
            typingSound.currentTime = 0; // Visszaállítja a hangot a kezdetére
        }
    }, typingSpeed);
}



