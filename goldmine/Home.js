import Action from "./Constants.js";

export default class Home {
    constructor() {
    }

    enter(subject) {
        console.log(subject.name + ": Walkin' home.");
    }
    
    execute(subject) {
        // console.log("gello");
        if(subject.fatigue > 0) {
            console.log(subject.name + ": ZZZZ....");
            --subject.fatigue;
        } else subject.changeState(Action.EnterMineAndDigForNugget);
    }

    exit(subject) {
        console.log(subject.name + ": What a God-darn fantastic nap! Time to find more gold.");        
    }
}