class MainScreen extends Screen {
    /**
     * @param {Screen | null} parent 
     */
    constructor(parent = null) {
        super(parent);
        this.addWidget(new Button(new Vec2d(0, 0), new Rectangle(50, 50), "button!", () => setScreen(new SettingsScreen(this))));
    }
    
    render() {
        super.render();
        context.fillStyle = "orange";
        context.font = "24px Arial";
        const text = "Main Menu";
        const textWidth = context.measureText(text)
        context.fillText(text, (canvas.width / 2) - (textWidth.width / 2), 50);
    }

    update() {
        super.update();
    }
}