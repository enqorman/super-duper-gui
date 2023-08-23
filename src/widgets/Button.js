class Button extends Widget {
    /**
     * @type {string}
     */
    #_text

    /**
     * @type {CallableFunction}
     */
    #_action

    /**
     * @param {Vec2d} position
     * @param {Rectangle} rect 
     * @param {string} text 
     * @param {CallableFunction} action 
     */
    constructor(position, rect, text, action) {
        super(position, rect);
        this.#_text = String(text);
        this.#_action = action;
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
        context.fillRect(this.getPosition().getX(), this.getPosition().getY(), this.getRect().getWidth(), this.getRect().getHeight())

        context.fillStyle = this.isActive() ? "yellow" : (this.isHovered() ? "black" : "white");
        context.font = "16px Arial";
        const textWidth = context.measureText(this.#_text)
        context.fillText(this.#_text, this.getPosition().getX() + (this.getRect().getWidth() / 2) - (textWidth.width / 2), this.getPosition().getY() + (this.getRect().getHeight() / 2) + (16 / 2));

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