class Vec2d {
    /**
     * @type {number}
     */
    #_x;

    /**
     * @type {number}
     */
    #_y;

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#_x = parseFloat(x);
        if (isNaN(this.#_x))
            this.#_x = 0;
        this.#_y = parseFloat(y);
        if (isNaN(this.#_y))
            this.#_y = 0;
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
}