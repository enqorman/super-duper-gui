/**
 * @param {string} message 
 */
function error(message) {
    throw new Error(message);
}

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("main") ?? error("bruh no canvas");

/**
 * @type {CanvasRenderingContext2D}
 */
const context = canvas?.getContext("2d") ?? error("no context bruh");

/**
 * @param {Screen} screen 
 */
function setScreen(screen) {
    if (!(screen instanceof Screen) && (screen != null))
        return;
    if (currentScreen && currentScreen.onClose)
        currentScreen.onClose();
    currentScreen = screen ?? new MainScreen();
    render();
}

function main() {
    render();

    window.addEventListener("contextmenu", (ev) => ev.preventDefault());

    window.addEventListener("mousedown", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseDown instanceof Function)
            currentScreen.onMouseDown(ev.clientX, ev.clientY);
    });
    
    window.addEventListener("mouseup", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseUp instanceof Function)
            currentScreen.onMouseUp(ev.clientX, ev.clientY);
    });
    
    window.addEventListener("mousemove", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseMove instanceof Function)
            currentScreen.onMouseMove(ev.clientX, ev.clientY);
    });

    window.addEventListener("keydown", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onKeyDown instanceof Function)
            currentScreen.onKeyDown(ev.keyCode);
    });

    window.addEventListener("keyup", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onKeyUp instanceof Function)
            currentScreen.onKeyUp(ev.keyCode, ev.getModifierState);
    });
}

/**
 * @type {Screen}
 */
let currentScreen;
const { width: canvasWidth, height: canvasHeight } = canvas;
function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    if (currentScreen) {
        currentScreen.render();
        currentScreen.update();
    } else {
        currentScreen = new MainScreen();
    }

    requestAnimationFrame(render);
}

main();