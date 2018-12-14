import Viewport from "../shared/engine/Viewport.js";
import Vector from "../shared/engine/Vector.js";

const cube = [
    // SOUTH
    [ 0, 0, 0,   0, 1, 0,   1, 1, 0],
    [ 0, 0, 0,   1, 1, 0,   1, 0, 0],

    // EAST
    [ 1, 0, 0,   1, 1, 0,   1, 1, 1],
    [ 1, 0, 0,   1, 1, 1,   1, 0, 1],

    // NORTH
    [ 1, 0, 1,   1, 1, 1,   0, 1, 1],
    [ 1, 0, 1,   0, 1, 1,   0, 0, 1],

    // WEST
    [ 0, 0, 1,   0, 1, 1,   0, 1, 0],
    [ 0, 0, 1,   0, 1, 0,   0, 0, 0],
    
    // TOP
    [ 0, 1, 0,   0, 1, 1,   1, 1, 1],
    [ 0, 1, 0,   1, 1, 1,   1, 1, 0],

    // BOTTOM
    [ 1, 0, 1,   0, 0, 1,   0, 0, 0],
    [ 1, 0, 1,   0, 0, 0,   1, 0, 0],

]


class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    divide(divisor) {
        this.x /= divisor;
        this.y /= divisor;
        this.z /= divisor;

    }
    getDotProduct(vector2) {
        return (this.x * vector2.x + this.y * vector2.y + this.z * vector2.z);
    }

    getSubtracted(vector) {
        // console.log(this, vector)
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    getNormalized() {
        return new Vector(Math.sqrt(this.x*this.x + this.y * this.y + this.z * this.z));
    }
}

class Triangle3D {
    constructor(v1, v2, v3) {
        this.p1 = v1;
        this.p2 = v2;
        this.p3 = v3;
    }
}

class Mesh {
    constructor(model) {
        this.triangles = [];
        this.create(model);
        // this.triangles = triangles;
    }
    create(model) {
        for(let i = 0; i < model.length; ++i) {
            this.triangles.push(new Triangle3D(
                new Vector3D(cube[i][0],cube[i][1],cube[i][2]),
                new Vector3D(cube[i][3],cube[i][4],cube[i][5]),
                new Vector3D(cube[i][6],cube[i][7],cube[i][8]),
            ));
        }
    }
    render() {
        // rendering mesh
    }
}

class GameEngine {
    constructor() {
        this.deltaTime;
        this.passedTime;
    }

    updateDelta() {
        const newTime = Date.now();
        this.deltaTime = (newTime - time) / 1000;
        this.passedTime = newTime;
    } 
}

class Matrix4x4 {
    constructor() {
        this.contents = new Array(4);
        // this.contents.fill(new Array(4));
        for(let i = 0; i<4; ++i) {
            this.contents[i] = new Array(4);
            this.contents[i].fill(0);
        }
    }
}

class Testing {
    constructor() {

        this.screenWidth = 800;
        this.screenHeight = 600;
        this.aspectRatio = this.screenHeight / this.screenWidth;
        this.near = .1;
        this.far = 1000;
        this.fov = 90;
        this.fovRadians = 1 / Math.tan(this.fov * .5 / 180 * Math.PI);
        this.meshCube = new Mesh(cube);
        this.deltaTime = .1;
        this.camera = new Vector3D();

        // regular projection
        this.projectionMatrix = new Matrix4x4();
        this.projectionMatrix.contents[0][0] = this.aspectRatio * this.fovRadians;
        this.projectionMatrix.contents[1][1] = this.fovRadians;
        this.projectionMatrix.contents[2][2] = this.far / (this.far - this.near);
        this.projectionMatrix.contents[3][2] = (-this.far * this.near) / (this.far - this.near);
        this.projectionMatrix.contents[2][3] = 1;
        this.projectionMatrix.contents[3][3] = 0;

        this.viewport = new Viewport;
        this.viewport.init();

        this.renderer = this.viewport.context;

        this.theta = 0;
        this.zRotation;
        this.xRotation;
        // this.renderer.translate(100, 300);
    }

    setRotation() {
        // Rotation Z
        this.zRotation = new Matrix4x4();
        this.zRotation.contents[0][0] = Math.cos(this.theta);
        this.zRotation.contents[0][1] = Math.sin(this.theta);
        this.zRotation.contents[1][0] = -Math.sin(this.theta);
        this.zRotation.contents[1][1] = Math.cos(this.theta);
        this.zRotation.contents[2][2] = 1;
        this.zRotation.contents[3][3] = 1;

        // Rotation X
        this.xRotation = new Matrix4x4();
        this.xRotation.contents[0][0] = 1;
        this.xRotation.contents[1][1] = Math.cos(this.theta * .5);
        this.xRotation.contents[1][2] = Math.sin(this.theta * .5);
        this.xRotation.contents[2][1] = -Math.sin(this.theta * .5);
        this.xRotation.contents[2][2] = Math.cos(this.theta * .5);
        this.xRotation.contents[3][3] = 1;
        // console.log(this.zRotation);
    }

    update() {
        this.theta += 1 * this.deltaTime;
        this.setRotation();
        this.viewport.clear();
        this.renderer.save();
        this.renderer.translate(100, 300);
        this.render();
        this.renderer.restore();
        // console.log("rendering...");
    }

        // this.renderer.translate(100, 100);
    render() {
        // console.log(this.xRotation);
        this.meshCube.triangles.forEach(triangle => {

            let vector1 = this.multiplyMatrixVector(triangle.p1, this.zRotation);
            let vector2 = this.multiplyMatrixVector(triangle.p2, this.zRotation);
            let vector3 = this.multiplyMatrixVector(triangle.p3, this.zRotation);

            vector1 = this.multiplyMatrixVector(vector1, this.xRotation);
            vector2 = this.multiplyMatrixVector(vector2, this.xRotation);
            vector3 = this.multiplyMatrixVector(vector3, this.xRotation);

            let projectedTriangle = new Triangle3D(vector1, vector2, vector3);

            projectedTriangle.p1.z +=3;
            projectedTriangle.p2.z +=3;
            projectedTriangle.p3.z +=3;
            
            // let newTriangle = translatedTriangle;
                projectedTriangle.p1 = this.multiplyMatrixVector(projectedTriangle.p1, this.projectionMatrix);
                projectedTriangle.p2 = this.multiplyMatrixVector(projectedTriangle.p2, this.projectionMatrix);
                projectedTriangle.p3 = this.multiplyMatrixVector(projectedTriangle.p3, this.projectionMatrix);

                // console.log(projectedTriangle.p3.z);
                projectedTriangle.p1.x += 1;
                projectedTriangle.p2.x += 1;
                projectedTriangle.p3.x += 1;
                projectedTriangle.p1.x *= .25 * this.screenWidth;
                projectedTriangle.p1.y *= .25 * this.screenHeight;

                projectedTriangle.p2.x *= .25 * this.screenWidth;
                projectedTriangle.p2.y *= .25 * this.screenHeight;

                projectedTriangle.p3.x *= .25 * this.screenWidth;
                projectedTriangle.p3.y *= .25 * this.screenHeight;

            const line1 = new Vector3D(
                projectedTriangle.p2.x - projectedTriangle.p1.x, 
                projectedTriangle.p2.y - projectedTriangle.p1.y, 
                projectedTriangle.p2.z - projectedTriangle.p1.z
            );

            const line2 = new Vector3D(
                projectedTriangle.p3.x - projectedTriangle.p1.x, 
                projectedTriangle.p3.y - projectedTriangle.p1.y, 
                projectedTriangle.p3.z - projectedTriangle.p1.z
            );

            const normal = new Vector3D(
                line1.y * line2.z - line1.z * line2.y,
                line1.z * line2.x - line1.x * line2.z,
                line1.x * line2.y - line1.y * line2.x
            );

            const l = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
            
            normal.divide(l);
            
            if(normal.getDotProduct(projectedTriangle.p1.getSubtracted(this.camera)) < 0) {
                const lightSource = new Vector3D(0, 0, -1);
                        // if(normal.z < 0) {
               
                this.renderer.beginPath();
                this.renderer.moveTo(projectedTriangle.p1.x, projectedTriangle.p1.y);
                this.renderer.lineTo(projectedTriangle.p2.x, projectedTriangle.p2.y);
                this.renderer.lineTo(projectedTriangle.p3.x, projectedTriangle.p3.y);
                this.renderer.lineTo(projectedTriangle.p1.x, projectedTriangle.p1.y);
                this.renderer.fill();
                this.renderer.stroke();
                this.renderer.closePath();
            } 
        })
    }

    multiplyMatrixVector(vector, matrix) {
        // Matrix rotation
        let w = vector.x * matrix.contents[0][3] + vector.y * matrix.contents[1][3] + vector.z * matrix.contents[2][3] + matrix.contents[3][3];
        if (w === 0) w = 1; 
        return new Vector3D(
            (vector.x * matrix.contents[0][0] + vector.y * matrix.contents[1][0] + vector.z * matrix.contents[2][0] + matrix.contents[3][0]) / w,
            (vector.x * matrix.contents[0][1] + vector.y * matrix.contents[1][1] + vector.z * matrix.contents[2][1] + matrix.contents[3][1]) / w,
            (vector.x * matrix.contents[0][2] + vector.y * matrix.contents[1][2] + vector.z * matrix.contents[2][2] + matrix.contents[3][2]) / w,
        );        
    }

}

const testing = new Testing;

const update = () => {
    testing.update();
}

setInterval(() => update(), 1000/24);
