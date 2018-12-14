import Viewport from '../shared/engine/Viewport.js';

class NoiseMaker {
    constructor() {
        this.originalSeed;
        this.noiseOutput;
        this.octaves;
        this.scale;

        this.renderer;

        this.width3D;
        this.height3D;
        this.original3DSeed;
    }

    init(renderer) {
        this.createSeeds(256);
        this.renderer = renderer;
        this.bias = 2;
        this.octaves = 4;

        this.width3D=256;
        this.height3D=256;
        this.create3DSample();
    }
    changeBias(number) {
        this.bias += number;
        if(this.bias < .2) this.bias = .2;
        // if(this.bias > 2) this.bias = 0.2;
    }

    changeOctave(number) {
        this.octaves += number;
        if(this.octaves > 16) this.octaves = 1;
        if(this.octaves < 1) this.octaves = 16;
    }

    render() {
        const scale = 800 / this.originalSeed.length;
        // console.log(this.originalSeed)

        // renderer.StrokeColor = "blue";
        // renderer.lineTo(500, 300);

        // moveTo(0, 0);
        for(let x = 0; x < this.originalSeed.length; x++) {
            // renderer.lineTo((x) * scale, this.originalSeed[x] * 300);
            // console.log(this.noiseOutput);
            renderer.lineTo((x) * scale, this.noiseOutput[x] * 300);
        };

        renderer.lineTo(800, this.originalSeed[0] * 300);
        renderer.stroke();
    }

    render3D() {
        // const scale = 800 / this.originalSeed.length;
        // console.log(this.originalSeed)

        // renderer.StrokeColor = "blue";
        // renderer.lineTo(500, 300);

        // moveTo(0, 0);
        for(let x = 0; x < this.width3D; x++) {
            for(let y = 0; y < this.height3D; y++) {
                renderer.beginPath();
                const color = Math.abs(Math.floor(this.noiseOutput3D[y * this.width3D + x] * 256));
                renderer.fillStyle = 'rgb(' + color + ',' + color +','+ color +')';
                // renderer.lineTo((x) * scale, this.noiseOutput[x] * 3001,1);
                renderer.fillRect(x, y, 1, 1);
                // console.log(color);
                // renderer.stroke();
            }
        };
        // console.log("ok");
        // renderer.lineTo(800, this.originalSeed[0] * 300);
        // renderer.stroke();

    }

    createSeeds(size) {
        this.originalSeed = new Array(size);
        this.noiseOutput = new Array(size);
        this.original3DSeed = new Array(size * size);
        this.noiseOutput3D = new Array(size * size);


        for(let i = 0; i < size; i++) this.originalSeed[i] = Math.random();
        for(let i = 0; i < size * size; i++) this.original3DSeed[i] = Math.random();
    }

    
    createSample() {        
        for(let i = 0; i < this.originalSeed.length; i++) {

            let noise = 0;
            let scale = 1;
            let accumulated = 0;
            for(let o = 0; o < this.octaves; o++) {
                let pitch = this.originalSeed.length >> o;
                let sample1 = Math.floor(i / pitch) * pitch;
                let sample2 = (sample1 + pitch) % this.originalSeed.length;

                let blend = (i - sample1) / pitch;

                // linear interpolation
                let linearSample = (1 - blend) * this.originalSeed[sample1] + blend * this.originalSeed[sample2];
                noise += linearSample * scale;
                accumulated += scale;

                scale /= this.bias;
                // console.log(pitch, sample1, sample2, blend, linearSample, scale);
            }
            // console.log(noise / accumulated);
            this.noiseOutput[i] = noise / accumulated;
        }        
    }
    create3DSample() {
        for(let x = 0; x < this.width3D; x++) {
            for(let y = 0; y < this.height3D; y++) {
                let noise = 0;
                let scale = 1;
                let accumulated = 0;

                for(let o = 0; o < this.octaves; o++) {
                    let pitch = this.width3D >> o;

                    let IndexX1 = Math.floor(x / pitch) * pitch;
                    let IndexY1 = Math.floor(y / pitch) * pitch;

                    let IndexX2 = (IndexX1 + pitch) % this.width3D;
                    let IndexY2 = (IndexY1 + pitch) % this.width3D;

                    let blendX = (x - IndexX1) / pitch;
                    let blendY = (y - IndexY1) / pitch;

                    // linear interpolation
                    let linearSampleT = (1 - blendX) * this.original3DSeed[IndexY1 * this.width3D + IndexX1] + blendX * this.original3DSeed[IndexY1 * this.width3D + IndexX2];
                    let linearSampleB = (1 - blendX) * this.original3DSeed[IndexY2 * this.width3D + IndexX1] + blendX * this.original3DSeed[IndexY2 * this.width3D + IndexX2]

                    noise += (blendY * (linearSampleB - linearSampleT) + linearSampleT) * scale;
                    accumulated += scale;

                    scale /= this.bias;
                    // console.log(linearSampleT);

                // console.log(this.original3DSeed[sampleY1 * this.width3D + sampleX1]);
                    // console.log(pitch, sample1, sample2, blend, linearSample, scale);
                }
                // console.log(noise / accumulated);
                this.noiseOutput3D[y * this.width3D + x] = noise / accumulated;
                
            }   
        }     
    }
}


const inputHandler = (key) => {
    // console.log(key);
    switch(key) {
        case '+': {
            perlin.changeBias(.2);
            break;
        }
        case '-': {
            perlin.changeBias(-.2);
            break;
        }
        case 'a': {
            perlin.changeOctave(1);
            break;
        }
        case 'z': {
            perlin.changeOctave(-1);
            break;
        }
    }
    viewport.clear();
    perlin.create3DSample();
    perlin.render3D();
}

const viewport = new Viewport(800, 600);
viewport.init();
viewport.setBackground("grey");
const renderer = viewport.context;

window.addEventListener('keypress', (e) => inputHandler(e.key));
const perlin = new NoiseMaker;
perlin.init(renderer);
perlin.render3D();