class Singleton {
    constructor() {
        this.data = [];
    }

    add(item) {
        this.data.push(item);
    }

    get(id) {
        return this.data.find(d => d.id === id);
    }
}

const instance = new Singleton();

Object.freeze(instance);

export default instance;