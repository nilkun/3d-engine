import Vehicle from './Vehicle.js'
import Vector from '../shared/engine/Vector.js'

export default class VehicleManager {
    constructor() {
        this.dots = new Array();
        this.position = { x: 0, y: 0 };
        this.xOffset = 10;
        this.yOffset = 10;
        this.isSeeking = true;
        this.enemy = new Vector();
    }
    
    add(x, y) {
        let newDot = new Vehicle;
        newDot.init();
        newDot.target.set(x + this.xOffset, y + this.yOffset);
        this.dots.push(newDot);
    }

    init() {
        this.dots.forEach(dot => {
            dot.init();
        })
    }

    flee(event) {
        this.enemy.set(event.x, event.y);
        this.isSeeking = false;
    }

    render(renderer) {
        this.dots.forEach(dot => {
            if(this.isSeeking) dot.update(this.isSeeking);
            else dot.update(this.isSeeking, this.enemy);
            dot.render(renderer);
        })
    }
}   
