import Action from "./Constants.js";

export default class QuenchThirst {
    constructor() {
    }

    enter(subject) {
        console.log(subject.name + ": Boy, ah sure is thusty! Walkin' to the saloon.");
    }
    
    execute(subject) {
        subject.thirst = 0;
        console.log(subject.name + ": That's mighty fine sippin' liquor.");
        subject.changeState(subject.previousIndex);
    }

    exit(subject) {
        console.log(subject.name + ": Leavin' the saloon, feelin' good.");        
    }
}