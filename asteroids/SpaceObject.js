import Vector from '../shared/engine/Vector.js'



let deltaTime;
let time;

const updateDelta = () => {
    const newTime = Date.now();
    deltaTime = (newTime - time) / 1000;
    time = newTime;
}

const initDelta = () => {
    time = Date.now();
};

class SpaceObject {
    constructor(position, direction, size, angle = 0, model) {
        this.position = new Vector(position.x, position.y);
        this.direction = new Vector(direction.x, direction.y);
        this.size=size;
        this.angle=angle;
        this.model=model;
        initDelta();
    }
}

export default class SpaceManager {
    constructor() {
        this.spaceObjects = [];

        // this.spaceObjects.push(
        //     new SpaceObject(new Vector(20, 20), 
        //     new Vector(8, -16),
        //     16,
        //     null,
        //     this.createAsteroid(16)
        //     ));
        this.player = new SpaceObject(new Vector(80, 50), new Vector(), 16, 0)

        this.getNewAsteroids();
        // this.asteroidModel = [];
        this.bullets = [];
        this.gameOver = false;
        this.score = 0;
        // let verts = 20;
        // let radius = this.spaceObjects[0].size;
        // for(let i = 0; i < verts; i++) {
        //     let a = i / verts * 6.28318;
        //     this.asteroidModel.push(new Vector(radius * Math.sin(a), radius * Math.cos(a)));
        // }
    }

    restart() {
        this.spaceObjects = [];

        // this.spaceObjects.push(
        //     new SpaceObject(new Vector(20, 20), 
        //     new Vector(8, -16),
        //     16,
        //     null,
        //     this.createAsteroid(16)
        //     ));
        this.player = new SpaceObject(new Vector(80, 50), new Vector(), 16, 0)
        this.bullets = [];

        this.getNewAsteroids();
        this.gameOver = false;
        this.score = 0;
    }

    createAsteroid(radius) {
        let model = [];
        let verts = 20;
        for(let i = 0; i < verts; i++) {
            const offset = (Math.random() * .4) + .8;
            let a = i / verts * 6.28318;
            model.push(new Vector(offset * radius * Math.sin(a), offset * radius * Math.cos(a)));
        }
        return model;
    }

    checkCollision(a, b) {
        const radius = b.size;
        let x = (a.position.x - b.position.x) * (a.position.x - b.position.x);
        let y = (a.position.y - b.position.y) * (a.position.y - b.position.y);
        return (radius * radius > x + y);        
    }

    renderWireframe(coordinates, position, rotation, renderer) {
        // console.log(coordinates);
        let transformedCoordinates = coordinates.slice();
        // console.log(transformedCoordinates);

        transformedCoordinates[0].rotate(rotation);
        renderer.moveTo(position.x + transformedCoordinates[0].x, position.y + transformedCoordinates[0].y);

        for(let i = 1; i < transformedCoordinates.length; i++) {
            transformedCoordinates[i].rotate(rotation);
            renderer.lineTo(position.x + transformedCoordinates[i].x, position.y + transformedCoordinates[i].y);
        }

        renderer.lineTo(position.x + transformedCoordinates[0].x, position.y + transformedCoordinates[0].y);
        renderer.stroke();
    }

    fire() {
        this.bullets.push(new SpaceObject(this.player.position, new Vector, 1, this.player.angle));
        this.bullets[this.bullets.length-1].direction.setDirection(50, this.bullets[this.bullets.length-1].angle);
    }

    getNewAsteroids() {
        this.spaceObjects.push(
            new SpaceObject(
                new Vector(30 * Math.sin(this.player.angle - 3.14159 /2), 30 * Math.cos(this.player.angle - 3.14159/ 2)),  
                new Vector(10 * Math.sin(this.player.angle), 10 * Math.cos(this.player.angle)),
                16,
                null,
                this.createAsteroid(16)
            )
        );
        this.spaceObjects.push(
            new SpaceObject(
                new Vector(30 * Math.sin(this.player.angle + 3.14159 /2), 30 * Math.cos(this.player.angle + 3.14159/ 2)),  
                new Vector(10 * Math.sin(this.player.angle), 10 * Math.cos(this.player.angle)),
                16,
                null,
                this.createAsteroid(16)
            )
        );
            
    }

    render(renderer) {
        // console.log(deltaTime)
        updateDelta();
        // console.log(this.spaceObjects);
        // const deltaTime = .1;
        const screenHeight = renderer.canvas.clientHeight;
        const screenWidth = renderer.canvas.clientWidth;
        

        for(let index=0; index < this.spaceObjects.length; index++) {


            const timeDirection = this.spaceObjects[index].direction.rScale(deltaTime);
            this.spaceObjects[index].position.add(timeDirection);
            this.spaceObjects[index].angle += .5 * deltaTime;
            if(this.spaceObjects[index].angle >= Math.PI) this.spaceObjects[index].angle -= Math.PI;
            // console.log(this.spaceObjects[index].angle);

            if(this.spaceObjects[index].position.x < 0)  this.spaceObjects[index].position.x += screenWidth;
            else if(this.spaceObjects[index].position.x >= screenWidth)this.spaceObjects[index].position.x -= screenWidth;
            if(this.spaceObjects[index].position.y < 0) this.spaceObjects[index].position.y += screenHeight;
            else if(this.spaceObjects[index].position.y >= screenHeight) this.spaceObjects[index].position.y -= screenHeight;

            this.renderWireframe(this.spaceObjects[index].model, this.spaceObjects[index].position, .5 * deltaTime, renderer);
        }
        

        for(let i = this.bullets.length-1; i >= 0; --i) {
            const timeDirection = this.bullets[i].direction.rScale(deltaTime);
            this.bullets[i].position.add(timeDirection);

            for(let j = 0; j < this.spaceObjects.length; ++j) {
                if(this.checkCollision(this.bullets[i], this.spaceObjects[j])) {
                    this.bullets[i].position.x = -200;

                    if(this.spaceObjects[j].size > 4) {
                        const halfSize = this.spaceObjects[j].size/2;

                        const obj1 = new SpaceObject(
                            this.spaceObjects[j].position, 
                            this.spaceObjects[j].direction,
                            halfSize,
                            null,
                            this.createAsteroid(halfSize)
                        );
                        const obj2 = new SpaceObject(
                            this.spaceObjects[j].position, 
                            this.spaceObjects[j].direction,
                            halfSize,
                            null,
                            this.createAsteroid(halfSize)
                        );
                        obj1.position.x += halfSize;
                        obj2.position.x -= halfSize;
                        obj2.direction.reverse();
                        this.spaceObjects.push(obj1);
                        this.spaceObjects.push(obj2);
                    }
                    this.score += 400 / this.spaceObjects[j].size;                    
                    this.spaceObjects.splice(j, 1);

                    break;
                }
            }
            if( this.spaceObjects.length === 0) { this.getNewAsteroids(); this.score +=1000; }

            if(this.bullets[i].position.x < 0 || this.bullets[i].position.x > screenWidth || this.bullets[i].position.y < 0 || this.bullets[i].position.y > screenHeight)
                this.bullets.splice(i, 1);
            else renderer.fillRect(this.bullets[i].position.x, this.bullets[i].position.y, 1, 1);
        }

        const timeDirection = this.player.direction.rScale(deltaTime);
        this.player.position.add(timeDirection);

        if(this.player.position.x < 0)  this.player.position.x += screenWidth;
        else if(this.player.position.x >= screenWidth)this.player.position.x -= screenWidth;
        if(this.player.position.y < 0)this.player.position.y += screenHeight;
        else if(this.player.position.y >= screenHeight) this.player.position.y -= screenHeight;

        for(let i = 0; i < this.spaceObjects.length; ++i) {
            if(this.checkCollision(this.player, this.spaceObjects[i])) {
                this.gameOver = true;
            }
        }

        const point1 = new Vector( 0, -5.5);
        const point2 = new Vector(-2.5, 2.5);
        const point3 = new Vector(2.5, 2.5);

        point1.rotate(this.player.angle);
        point2.rotate(this.player.angle);
        point3.rotate(this.player.angle);

        renderer.moveTo(this.player.position.x + point1.x, this.player.position.y + point1.y);
        renderer.lineTo(this.player.position.x + point2.x, this.player.position.y + point2.y);
        renderer.lineTo(this.player.position.x + point3.x, this.player.position.y + point3.y);
        renderer.lineTo(this.player.position.x + point1.x, this.player.position.y + point1.y);
        renderer.stroke();

        // renderer.font("30px Arial");
        renderer.fillText("Score: " + this.score, 5, 95);

        if(this.gameOver) this.restart();
    }
}
