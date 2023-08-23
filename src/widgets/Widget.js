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
     * @type {Vec2d}
     */
    #_position;

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
    constructor(position, rect) {
        if (!(position instanceof Vec2d))
            throw new Error("Widget expected position to be of type Vec2d.");
        if (!(rect instanceof Rectangle))
            throw new Error("Widget expected rect to be of type Rectangle.");
        this.#_id = Math.floor(Math.random() * 4940483);
        this.#_rect = rect;
        this.#_position = position;
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
     * @returns {Vec2d}
     */
    getPosition() {
        return this.#_position;
    }

    /**
     * @param {Vec2d} position 
     */
    setPosition(position) {
        if (!(position instanceof Vec2d))
            throw new Error("Widget::setPosition expected position to be of type Vec2d.");
        this.#_position = position;
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

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    render(mouseX, mouseY) {}

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
    onKeyDown(keyCode, modifier) {}

    /**
     * @param {number} keyCode 
     * @param {CallableFunction} modifier 
     */
    onKeyUp(keyCode, modifier) {}
}