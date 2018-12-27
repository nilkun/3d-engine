
let multiplier = (value) => {
    return function(x) { return x * value; }
}

const execute = (variable, func) => {
    return func(variable);
}

let switchCreator = () => {
    let lightsOn = true;
    return () => {
        if(lightsOn) console.log("Lights on!");
        else console.log("lights off!");
        lightsOn = !lightsOn;
    }
}

let lightSwitch = switchCreator();
lightSwitch();
//should output: 'Lights On!'
lightSwitch();
//should output: 'Lights Off!'

const memoCreator = (func) => {
    let keys = {};
    return function(number) {
        if(keys[number]) {
            console.log(keys[number], ": from memory.");
        }
        else {
            keys[number] = func(number);
            console.log(keys[number], ": calculated.");
        }
    }
}


const loop = (initial, test, update, body) => {
    let i = initial;
    while(test(i)) {
        body(i);
        i = update(i);
    }
}

const loop = (initial, test, update, body) => {
    if(!test(initial)) return;
    body(initial);
    loop(update(initial), test, update, body);
}