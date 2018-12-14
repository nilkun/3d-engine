import Action from "./Constants.js";

export default class EnterMineAndDigForNugget {
    constructor() {
    }

    enter(subject) {
        console.log(subject.name + ": Walkin' to the gold mine.");
    }
    
    execute(subject) {
        subject.addToGoldCarried(1);
        subject.increaseFatigue();
        
        console.log(subject.name + ": Picking up a nugget.");

        if(subject.pocketsFull()) subject.changeState(Action.VisitBankAndDepositGold);
        if(subject.thirsty()) subject.changeState(Action.QuenchThirst);
    }

    exit(subject) {
        console.log(subject.name + ": Ah'm leavin' the gold mine with mah pockets full o' sweet gold.");        
    }
}