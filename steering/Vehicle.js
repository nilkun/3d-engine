import Vector from '../shared/engine/Vector.js'

export default class Vehicle {
    constructor() {
        this.position = new Vector;
        this.velocity = new Vector;
        this.acceleration = new Vector;

        this.speed;
        this.deceleration;
        
        this.target = new Vector;
        this.maxForce;;
    }

    init() {
        this.position.set(0, 0);
        this.velocity.set(0,0);
        this.acceleration.set(0, 0);
        this.speed = 15;
        this.deceleration = this.speed / 100;
        this.target.set(0, 0);
        this.maxForce =  .05;
    }

    update(isSeeking, variable = this.target) {
        let force;
        if(isSeeking) force = this.arrive(variable);
        else force = this.flee(variable);
        this.applyForce(force);

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.reset();
    }

    flee(enemy) {
        let desired = new Vector();
        desired.add(this.position);
        desired.sub(enemy);

        let d = desired.getMag();
        let speed = this.speed;
        if(d>100) speed = d * this.deceleration;
        if(d>150) speed = 0;

        desired.setMag(speed);
        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    arrive() {
        let desired = new Vector();
        desired.add(this.target);
        desired.sub(this.position);

        let d = desired.getMag();
        let speed = this.speed;
        if(d<100) speed = d * this.deceleration;
        if(d<1) speed = 0;

        desired.setMag(speed);
        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    setPos(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    setTarget(x, y) {
        this.target.set(x, y);
    }

    render(renderer) {
        renderer.beginPath();
        renderer.fillRect(this.position.x, this.position.y,2,2);
        // renderer.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI, false);
        // renderer.fillStyle = 'orange';
        // renderer.fill();
        renderer.stroke();
    }
}