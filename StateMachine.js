
export default class StateMachine {
    constructor() {
        this.owner;
        this.isRunning=false;
        this.currentState;
        this.previousState;
        this.globalState;
    }

    enter() {
        // check if initialized
    }
    leave() {

    }
}

dummy class State {
    constructor() {

    }

    enter() {

    }
    leave() {
        
    }
}