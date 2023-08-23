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

class Rectangle {
    /**
     * @type {number}
     */
    width;

    /**
     * @type {number}
     */
    height;

    /**
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width = 0, height = 0) {
        this.width = parseFloat(width);
        this.height = parseFloat(height);
    }
}

/**
 * @param {number} x 
 * @param {number} y 
 * @param {Rectangle} rect 
 */
function mouseInRect(mouseX, x, mouseY, y, rect) {
    return (mouseX >= x && mouseX <= x + rect.width) && 
            (mouseY >= y && mouseY <= y + rect.height);
}

class Widget {
    /**
     * @type {number}
     */
    #_id;

    /**
     * @type {Rectangle}
     */
    #_rect;

    /**
     * @type {boolean}
     */
    #_hovered;

    /**
     * @type {boolean}
     */
    #_active;
    
    /**
     * @type {boolean}
     */
    #_disabled;

    /**
     * @param {Rectangle} rect 
     */
    constructor(rect) {
        if (!(rect instanceof Rectangle))
            throw new Error("Widget expected rect to be of type Rectangle.");
        this.#_id = Math.floor(Math.random() * 4940483);
        this.#_rect = rect;
        this.#_hovered = false;
        this.#_active = false;
        this.#_disabled = false;
    }

    /**
     * @returns {number}
     */
    getId() {
        return this.#_id;
    }

    /**
     * @returns {Rectangle}
     */
    getRect() {
        return this.#_rect;
    }

    /**
     * @returns {boolean}
     */
    isHovered() {
        return this.#_hovered;
    }

    /**
     * @param {boolean} hovered 
     * @returns {void}
     */
    setHovered(hovered) {
        if (this.#_hovered == hovered)
            return;
        this.#_hovered = Boolean(hovered);
    }

    /**
     * @returns {boolean}
     */
    isActive() {
        return this.#_active;
    }

    /**
     * @param {boolean} active 
     * @returns {void}
     */
    setActive(active) {
        if (this.#_active == active)
            return;
        this.#_active = Boolean(active);
    }

    /**
     * @returns {boolean}
     */
    isDisabled() {
        return this.#_disabled;
    }

    /**
     * @param {boolean} disabled 
     * @returns {void}
     */
    setDisabled(disabled) {
        if (this.#_disabled == disabled)
            return;
        this.#_disabled = Boolean(disabled);
    }

    render() {}

    update() {}
    
    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseDown(mouseX, mouseY) {}
    
    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseUp(mouseX, mouseY) {}
    
    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseMove(mouseX, mouseY) {}

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyDown(keyCode) {}

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyUp(keyCode) {}
}

class Button extends Widget {
    /**
     * @type {number}
     */
    #_x

    /**
     * @type {number}
     */
    #_y

    /**
     * @type {string}
     */
    #_text

    /**
     * @type {CallableFunction}
     */
    #_action

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {Rectangle} rect 
     * @param {string} text 
     * @param {CallableFunction} action 
     */
    constructor(x, y, rect, text, action) {
        super(rect);
        this.#_x = parseInt(x);
        this.#_y = parseInt(y);
        this.#_text = String(text);
        this.#_action = action;
    }

    /**
     * @returns {number}
     */
    getX() {
        return this.#_x;
    }
    
    /**
     * @returns {number}
     */
    getY() {
        return this.#_x;
    }

    /**
     * @returns {string}
     */
    getText() {
        return this.#_text;
    }

    /**
     * @returns {CallableFunction | null}
     */
    getAction() {
        return this.#_action ?? null;
    }

    render() {
        context.fillStyle = this.isActive() ? "red" : (this.isHovered() ? "yellow" : "blue"); 
        context.fillRect(this.#_x, this.#_y, this.getRect().width, this.getRect().height)
    }

    update() {
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseDown(mouseX, mouseY) {
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseUp(mouseX, mouseY) {
        if (this.#_action && this.#_action instanceof Function)
            this.#_action(this);
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseMove(mouseX, mouseY) {
    }

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyDown(keyCode, modifier) {}

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyUp(keyCode, modifier) {}
}

class Screen {
    /**
     * @type {number}
     */
    #_lastMouseX;

    /**
     * @type {number}
     */
    #_lastMouseY;

    /**
     * @type {Widget[]}
     */
    #_widgets;

    /**
     * @type {Screen | undefined}
     */
    #_parent;

    /**
     * @param {Screen} parent 
     */
    constructor(parent) {
        this.#_lastMouseX = 0;
        this.#_lastMouseY = 0;
        this.#_widgets = new Map();
        this.#_parent = parent;
    }

    /**
     * @returns {boolean}
     */
    canGoBack() {
        return !!this.#_parent;
    }

    back() {
        if (!this.#_parent || !(this.#_parent instanceof Screen))
            return;
        this.onClose();
        setScreen(this.#_parent);
    }

    /**
     * @param {Widget} widget 
     * @returns {void}
     */
    addWidget(widget) {
        if (!(widget instanceof Widget))
            throw new Error("Provided object is not an instance of Widget.");
        if (this.#_widgets.has(widget.getId()))
            return;
        this.#_widgets.set(widget.getId(), widget);
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseDown(mouseX, mouseY) {
        this.#_widgets.forEach(widget => {
            if (!mouseInRect(mouseX, widget.getX(), mouseY, widget.getY(), widget.getRect()) || widget.isDisabled()) 
                return;
            widget.onMouseDown(mouseX, mouseY);
            widget.setActive(true);
        });
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseUp(mouseX, mouseY) {
        this.#_widgets.forEach(widget => {
            widget.setActive(false);
            if (!mouseInRect(mouseX, widget.getX(), mouseY, widget.getY(), widget.getRect()) || widget.isDisabled()) {
                return;
            }
            widget.onMouseUp(mouseX, mouseY);
        });
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseMove(mouseX, mouseY) {
        // kind of hack, screen should also take mouseX/mouseY in render
        this.#_lastMouseX = mouseX;
        this.#_lastMouseY = mouseY;
        this.#_widgets.forEach(widget => {
            if (!mouseInRect(mouseX, widget.getX(), mouseY, widget.getY(), widget.getRect()) || widget.isDisabled()) {
                widget.setHovered(false);
                return;
            }
            widget.onMouseMove(mouseX, mouseY);
            widget.setHovered(true);
        });
    }

    render() {
        this.#_widgets.forEach(widget => widget.render(this.#_lastMouseX, this.#_lastMouseY));
    }

    update() {
        this.#_widgets.forEach(widget => widget.update());
    }

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyDown(keyCode, modifier) {
        if (keyCode === 27) this.back()
        this.#_widgets.forEach(widget => {
            if (!widget.isDisabled() && widget.isActive())
                widget.onKeyDown(keyCode, modifier);
        });
    }

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyUp(keyCode, modifier) {
        this.#_widgets.forEach(widget => {
            if (!widget.isDisabled() && widget.isActive())
                widget.onKeyUp(keyCode, modifier);
        });
    }

    onClose() {
        this.#_widgets.forEach(widget => {
            widget.setActive(false);
            widget.setHovered(false);
        });
    }
}

class MainScreen extends Screen {
    constructor(parent) {
        super(parent);
        this.addWidget(new Button(0, 0, new Rectangle(50, 50), "button!", () => setScreen(new SettingsScreen(this))));
    }
    
    render() {
        super.render();
    }

    update() {
        super.update();
    }
}

class SettingsScreen extends Screen {
    /**
     * @param {Screen} parent 
     */
    constructor(parent) {
        super(parent);
        this.addWidget(new Button(50, 50, new Rectangle(40, 70), "back!", () => this.back()));
    }
    
    render() {
        super.render();

        context.fillStyle = "orange";
        context.font = "24px Arial";
        context.fillText("settings lol", 50, 50);
    }

    update() {
        super.update();
    }

    onClose() {}
}

/**
 * @param {Screen} screen 
 */
function setScreen(screen) {
    if (!screen || !(screen instanceof Screen))
        return;
    if (currentScreen && currentScreen.onClose)
        currentScreen.onClose();
    currentScreen = screen;
    render();
}

function main() {
    render();

    window.addEventListener("mousedown", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseDown instanceof Function)
            currentScreen.onMouseDown(ev.offsetX, ev.offsetY);
    });
    
    window.addEventListener("mouseup", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseUp instanceof Function)
            currentScreen.onMouseUp(ev.offsetX, ev.offsetY);
    });
    
    window.addEventListener("mousemove", (ev) => {
        ev.preventDefault();
        if (currentScreen && currentScreen.onMouseMove instanceof Function)
            currentScreen.onMouseMove(ev.offsetX, ev.offsetY);
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