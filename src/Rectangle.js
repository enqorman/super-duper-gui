class Rectangle {
    /**
     * @type {number}
     */
    #_width;

    /**
     * @type {number}
     */
    #_height;

    /**
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width = 0, height = 0) {
        this.#_width = parseFloat(width);
        if (isNaN(this.#_width))
            this.#_width = 0;
        this.#_height = parseFloat(height);
        if (isNaN(this.#_height))
            this.#_height = 0;
    }

    getWidth() {
        return this.#_width;
    }

    getHeight() {
        return this.#_height;
    }
}