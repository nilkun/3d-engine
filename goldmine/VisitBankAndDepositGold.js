import Action from "./Constants.js";

export default class VisitBankAndDepositGold {
    constructor() {
    }

    enter(subject) {
        console.log(subject.name + ": Goin' to the bank. Yes siree.");
    }
    
    execute(subject) {
        subject.moneyInBank += subject.goldCarried;
        subject.goldCarried = 0;
        console.log(subject.name + ": Depositin' gold. Total savings now: " + subject.moneyInBank);
        if(subject.moneyInBank > 5) subject.changeState(Action.GoHomeAndSleepTilRested);
        else subject.changeState(subject.previousIndex);

    }

    exit(subject) {
        console.log(subject.name + ": Leavin' the bank.");        
    }
}