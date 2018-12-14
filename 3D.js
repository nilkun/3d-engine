import Viewport from './shared/engine/Viewport.js';

const viewport = new Viewport(900, 600);
viewport.init();
const renderer = viewport.context;
// viewport.setBackground("grey");

const width = 20;
const spacing = 5;

class Cube {
    constructor(x, y, z, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.height = height;
        this.isShrinking = false;
    }

    setup(values) {
        this.height = values.height;
        this.isShrinking = values.isShrinking;
    }

    render(renderer) {
        const x = this.x * width + spacing*this.x;
        const y = this.y - this.height/2;
        renderer.fillStyle = '#aaa';
        renderer.fillRect(x, y, width, this.height);


        renderer.fillStyle = '#f00';
        renderer.beginPath();
        renderer.moveTo(x, y)
        // renderer.moveTo(0, 0);
        renderer.lineTo(x + 10, y-10);
        renderer.lineTo(x + 30, y-10);
        renderer.lineTo(x + 20, y);
        renderer.closePath();
        renderer.fill();



        renderer.beginPath();
        renderer.fillStyle = '#000';
        renderer.moveTo(x + 20, y);
        renderer.lineTo(x + 20, y+this.height);
        renderer.lineTo(x + 30, y+this.height-10);
        renderer.lineTo(x + 30, y-10);

        renderer.closePath();
        renderer.fill();
    }

    renderZ(renderer) {

        const x = this.x * width + spacing*this.x;
        const y = this.y - this.height/2;

        // console.log(x);
        // console.log("rendering: ", x, y);
        renderer.fillStyle = '#aaa';
        renderer.fillRect(x, y, width, this.height);


        renderer.fillStyle = '#444';
        renderer.beginPath();
        renderer.moveTo(x, y)
        // renderer.moveTo(0, 0);
        renderer.lineTo(x + 10, y-10);
        renderer.lineTo(x + 30, y-10);
        renderer.lineTo(x + 20, y);
        renderer.closePath();
        renderer.fill();



        renderer.beginPath();
        renderer.fillStyle = '#888';
        renderer.moveTo(x + 20, y);
        renderer.lineTo(x + 20, y+this.height);
        renderer.lineTo(x + 30, y+this.height-10);
        renderer.lineTo(x + 30, y-10);

        renderer.closePath();
        renderer.fill();
    }

    setHeight() {
        if(this.isShrinking) {
            this.height-=steps;
            if(this.height < minHeight) this.isShrinking = false;
        }
        else {
            this.height+=steps;
            if(this.height > maxHeight) this.isShrinking = true;
        }

    }
}

const dimension = 21;
const maxHeight = 110;
const minHeight = 10;
const steps = 8;

const minMax = maxHeight - minHeight;
const median = minMax / 2;
const middle = Math.ceil(dimension/2);
// const cube = new Cube;
// cube.x = 60;
// cube.y = 50;
// cube.z = 50;
// cube.height = 60;
// cube.render(renderer);
// renderer.save();
// const cubes = [];
// const cubes2 = [];

// 1 row has 21 items, ie 11 different values;
// middle value starts top sides bottom!
// diff ?

const getH = (x, y) => {
    return (10 + (Math.abs(x-y)*10));
}

const getInitial = (i, j) => {
    let value1;
    let value2;
    let isShrinking = false;
    // if(i < middle) 
    value1 = Math.abs(i - middle) * steps;
    value2 = Math.abs(j - middle) * steps;
    let height = Math.abs(maxHeight - (value1 + value2));
    if (value1+value2 > maxHeight- minHeight) isShrinking = true;
    // else value = (i - middle) * steps;
    return { height, isShrinking };
}

// for(let i = 0; i < 21; i++) cubes.push(new Cube(i, 50, null, getH(i, 10)));
// for(let i = 0; i < 21; i++) cubes2.push(new Cube(i, 50, 1, getH(i, 10)));

const cubes = new Array(dimension);
for(let i = 0; i < dimension; i++) {
    cubes[i] = [];
    for(let j = 0; j <dimension; j++) {
        cubes[i].push(new Cube(j, 0));
        cubes[i][j].setup(getInitial(i, j));
    } 
}

// Move to better location
// renderer.translate(50, 300);

// cubes.forEach(cube => {
//     cube.setHeight();
//     cube.render(renderer);
// });
// console.log("updating");
const update = () => {
    // console.log("updating");
    // renderer.translate(0, 0);
    // renderer.restore();
    viewport.clear();
    renderer.save();
    renderer.translate(325, 100);
    // cubes[1][1].setHeight();
    // cubes[1][1].renderZ(renderer);
    // renderer.translate(50, 300);
    for(let i = 0; i < dimension; i++) {
        for(let j = 0; j < dimension; j++) {
            cubes[i][j].setHeight();
            cubes[i][j].renderZ(renderer);
        }
        // cubes[i].forEach(cube => {
        //     // renderer.translate(50, 300);
        //     // console.log(cube.setHeight);
        //     cube.setHeight();
        //     cube.renderZ(renderer);
        // renderer.restore();
        // console.log(cubes[0][i]);
        // });
        // console.log(cubes[i][1]);
        renderer.translate(-15, 17.5);
    }



    // cubes.forEach(cube => {
        // renderer.translate(50, 300);
        // cube.setHeight();
        // cube.render(renderer);
    // renderer.restore();
    // });

    
    +renderer.restore();
    // cubes2.forEach(cube => {
    //     // renderer.translate(50, 300);
    //     cube.setHeight();
    //     cube.render(renderer);
    // // renderer.restore();
    // });
}

setInterval(() => update(), 1000/24);

