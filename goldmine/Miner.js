import Mine from "./EnterMineAndDigForNugget.js";
import Bank from "./VisitBankAndDepositGold.js";
import Saloon from "./QuenchThirst.js";
import Home from "./Home.js";
// import Action from './Constants.js';

const home = new Home();
const mine = new Mine();
const bank = new Bank();
const saloon = new Saloon();

const locations = [];
// let index = 0;
locations.push(home);
locations.push(bank);
locations.push(saloon);
locations.push(mine);

class Miner{
    constructor() {

        this.previousIndex;
        this.currentIndex;
        this.globalIndex;

        this.location;
        this.goldCarried;
        this.moneyInBank;
        this.thirst;
        this.fatigue;
        this.name;
    }

    init() {
        this.currentIndex = 0;
        this.name = "Miner Bob";
        this.location;
        this.goldCarried = 0;
        this.moneyInBank = 0;
        this.thirst = 0;
        this.fatigue = 0;
    }

    pocketsFull() { return this.goldCarried > 2; }
    thirsty() { return this.thirst > 10; }

    addToGoldCarried(amt) {
        this.goldCarried += amt;
    }
    increaseFatigue() {
        this.fatigue++;
    }

    update() {
        this.thirst++;
        // console.log(this.currentIndex)
        // if(this.currentState) 
        locations[this.currentIndex].execute(this);
    }

    changeState(index) {

        // let state;
        // switch(target) {
        //     case "VisitBankAndDepositGold":
        //         state = bank;
        //         index = 1;
        //         break;
        //     case "QuenchThirst":
        //         state = saloon;
        //         index = 2;
        //         break;
        //     case "GoHomeAndSleepTilRested":
        //         state = home;
        //         index = 0;
        //         break;
        //     case "EnterMineAndDigForNugget":
        //         state = mine;
        //         index = 3;
        //         break;
        // }
        // this.setPreviousState(target);

        locations[this.currentIndex].exit(this);

        this.setPreviousIndex(this.currentIndex);
        this.currentIndex = index;

        locations[this.currentIndex].enter(this);
    }
    swap(a) {
        return a;
    }

    revertToPreviousState() {
        // // needs a copy
        // const temp = this.currentState;

        // this.currentState = this.previousState;
        // this.previousState = temp;

        // this.currentState = this.swap(this.previousState, this.previousState=this.currentState);
        // this.changeState()
    }

    setCurrentState(state) { this.currentState = state; }
    setPreviousState(state) { this.previousState = state; }
    setGlobalState(state) { this.globalState = state; }

    setPreviousIndex(index) { this.previousIndex = index; }

}

console.log("hi")
const miner = new Miner;
miner.init();
setInterval(() => miner.update(), 500);