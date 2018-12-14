import SpaceManager from './SpaceObject.js';
import Viewport from '../shared/engine/Viewport.js';


const game = new SpaceManager;

const viewport = new Viewport(160, 100);
viewport.init();
const renderer = viewport.context;

const update = () => {
    viewport.clear();
    game.render(renderer);
}
const deltaTime = 0.5;
const pressed = (e) => {
    console.log(e.key);
    switch(e.key) {
        case 'ArrowLeft':
            game.player.angle -= 0.0872665 * deltaTime;
            break;
        case 'ArrowRight':
            game.player.angle += 0.0872665 * deltaTime;
            break;
        case 'ArrowUp':
            game.player.direction.setDirection(20 * deltaTime, game.player.angle);
            break;
        case ' ':
            game.fire();
            break;
    }
}

window.addEventListener('keydown', (e) => pressed(e));

setInterval(() => update(), 100);