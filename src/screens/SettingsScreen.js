class SettingsScreen extends Screen {
    /**
     * @param {Screen | null} parent 
     */
    constructor(parent = null) {
        super(parent);
        this.addWidget(new Button(new Vec2d((canvas.width / 2) - (120 / 2), 120), new Rectangle(120, 40), "back!", () => this.back()));
    }
    
    render() {
        super.render();
        context.fillStyle = "orange";
        context.font = "24px Arial";
        const text = "settings lol";
        const textWidth = context.measureText(text)
        context.fillText(text, (canvas.width / 2) - (textWidth.width / 2), 50);
    }

    update() {
        super.update();
    }

    onClose() {}
}