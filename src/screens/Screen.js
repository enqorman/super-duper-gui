class Screen {
    /**
     * @type {Vec2d}
     */
    #_lastMousePosition;

    /**
     * @type {Map<number, Widget>}
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
        this.#_lastMousePosition = new Vec2d(0, 0);
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
            if (!collisionRect(new Vec2d(mouseX, mouseY), widget.getPosition(), widget.getRect()) || widget.isDisabled()) 
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
            if (!collisionRect(new Vec2d(mouseX, mouseY), widget.getPosition(), widget.getRect()) || widget.isDisabled())
                return;
            widget.onMouseUp(mouseX, mouseY);
        });
    }

    /**
     * @param {number} mouseX 
     * @param {number} mouseY 
     */
    onMouseMove(mouseX, mouseY) {
        // kind of hack, screen should also take mouseX/mouseY in render
        this.#_lastMousePosition = new Vec2d(mouseX, mouseY);
        this.#_widgets.forEach(widget => {
            if (!collisionRect(this.#_lastMousePosition, widget.getPosition(), widget.getRect()) || widget.isDisabled()) {
                widget.setHovered(false);
                return;
            }
            widget.onMouseMove(mouseX, mouseY);
            widget.setHovered(true);
        });
    }

    render() {
        this.#_widgets.forEach(widget => widget.render(this.#_lastMousePosition.getX(), this.#_lastMousePosition.getY()));
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