export default class Viewport {
    constructor(width = 800, height = 600, canvas = "canvas") {
        this.canvas = document.getElementById(canvas);
        this.canvasName = canvas;
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    setBackground(color) {
        this.canvas.style.background = color;
    }
    init() {
        this.canvas = document.getElementById(this.canvasName);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.background = "#FFAA00";
        this.canvas.style.border = "1px solid #000000";
    }
    clear() {
        // this.context.translate(0,0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
    }
    refetchCanvas() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.canvas = document.getElementById(this.canvasName);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
    getMouse(event) {
        const rect = this.canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    getTouch(event) {
        event.preventDefault();
        // const rect = this.canvas.getBoundingClientRect();
        return { x: event.changedTouches[0].pageX  , y: event.changedTouches[0].pageY };
    }
}