import Viewport from '../shared/engine/Viewport.js';
import Vector from '../shared/engine/Vector.js';
class GridSystem {
    constructor() {

    }
}

class Grid {
    constructor() {
        this.position;
        this.texture;
    }
    init(x, y, textureMap) {
        this.position = new Vector(x, y);
    }
}

class Tile {
    constructor() {
        this.color = "green";
        this.position = 0;
    }
}

class TileManager {
    constructor() {
        this.dimensions;
        this.size;
    }
    render() {

    }
}

class PersonManager {
    constructor() {
        this.persons;
    }
}

class Person {
    constructor() {
        this.position;
        this.isColliding;
        this.texture;
    }
}

const person = new Person;

person.texture = new Image();
person.texture.src = './ninja.png';

class Game {
    constructor() {
        // Viewport
        this.viewport;
        this.renderer;

        this.playView;
        this.maxSquareSize;
        this.scene;
        this.offset;
        this.scale;

        this.currentScene;
    }

    createScene() {
        for(let i = 0; i < (this.scene.length); ++i) {
            this.scene[i] = new Tile;
        }
    }

    loadResources() {

    }
    render() {
        // console.log(this.playView);
        for(let row = 0; row < this.playView.y; ++row) {
            for(let col = 0; col < this.playView.x; ++col) {
                this.renderer.beginPath();
                const currentTile = this.scene[col + col * row];
                this.renderer.fillStyle = currentTile.color;
                if(currentTile.color === "red") console.log(row, col);
                console.log(currentTile.color);
                this.renderer.strokeStyle = "black";
                this.renderer.rect(col * this.scale.x, row * this.scale.y, this.scale.x, this.scale.y,);
                this.renderer.fill();
                this.renderer.stroke();          
            }
        }
        // console.log(person.texture);
        this.renderer.drawImage(person.texture, 100, 100);

    }

    init(screenWidth, screenHeight, playView) {

        // Set up viewport and renderer
        this.viewport = new Viewport(screenWidth, screenHeight);
        this.viewport.init();
        this.renderer = this.viewport.context;

        // Set up 
        this.playView = new Vector(playView.x, playView.y);

        this.scene = new Array(this.playView.x * this.playView.y);
        this.createScene();
        this.setScale();

        this.scale = new Vector(this.maxSquareSize, this.maxSquareSize);
        this.offset = new Vector(-this.scale.x/2, -this.scale.x/2);

        this.currentScene = new TileManager();
        this.createTestTiles();
    }
    createTestTiles() {
        for(let i = 0; i < this.currentScene.length; ++i) {
            this.currentScene[i] = new Tile();
        }
    }

    setScale() {
        const x = this.viewport.canvas.scrollWidth / this.playView.x;
        const y =  this.viewport.canvas.scrollHeight / this.playView.y;
        // console.log("here:", this.screenWidth, this.playView);
        
        if(x>y) this.maxSquareSize = y;
        else this.maxSquareSize = x;
        // console.log(this.maxSquareSize);
    }

    start() {
        // get things started
    }
}

const game = new Game;

game.init(640, 480, new Vector(16,11));
// console.log(game.scene[50].color);
game.scene[50].color = "red";
console.log(game.scene.length);
// console.log(game.scene[50].color);
game.render();