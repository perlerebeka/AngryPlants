
export const keys = {
    w: false,  
    a: false,  
    d: false,  
    space: false 
};

export function setupInputListeners() {
    window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (keys.hasOwnProperty(key)) {
            keys[key] = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();
        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            keys.space = true;
            console.log('Space pressed');  // Itt ellenőrizheted, hogy valóban nyomsz space-t
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            keys.space = false;
        }
    });
}
