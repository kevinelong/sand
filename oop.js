
// NOUNS: WHICH KINS OF PEOPLE, PLACES, THINGS
// VERBS: ACTIONS - WHAT DID IT DO?
// ADJECTIVES: Attributes, measures, descriptive words

//for the sand demo? blocks accumulating to create a pyramid

// Where did they accumulate?
//main in the center of ... the page, mainly down the middle

//WHERE DID THEY START?

//WHERE DID THEY STOP?

//HOW DID THEY MOVE?

// WHEN DID THEY MOVE?

/*
top of the screen

Angel Fraser  to  Everyone 6:25 AM
they started from the top and accumulated at the bottom

yonesh thapa 6:26 AM
random places on the top of the screen
*/
class Display {
    constructor(world, canvasElement, SCALE = 20, GAP = 2) {
        this.world = world;
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.SCALE = SCALE;
        this.GAP = GAP;
    }
    animate() {
        this.draw();
        const a = this.animate;
        this.world.animate();
        requestAnimationFrame(this.animate.bind(this));
    }
    pixel(x, y) {
        this.ctx.fillRect(
            x * this.SCALE,
            y * this.SCALE,
            this.SCALE - this.GAP,
            this.SCALE - this.GAP
        );
    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw() {
        const data = this.world.matrix;
        const height = this.world.height;
        const width = this.world.width;
        this.clearScreen();
        this.ctx.fillStyle = "#00ff00";
        this.world.elementList.forEach(e=>this.pixel(e.position.x, e.position.y))
        this.ctx.stroke();
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Color {
    constructor(symbol) {
        this.symbol = symbol;
    }
}
class Element { //Blocks Elements, Sand, Water Gas
    constructor(position, matrix, color) {
        this.position = position;
        this.matrix = matrix; //TO SEE OUR NEIGHBORS AND MOVE WITHIN
        this.color = color;
        this.color = color || new Color("O");
        this.north = () => this.matrix[this.position.y - 1][this.position.x];
        this.northEast = () => this.matrix[this.position.y - 1][this.position.x + 1];
        this.east = () => this.matrix[this.position.y][this.position.x + 1];
        this.southEast = () => this.matrix[this.position.y + 1][this.position.x + 1];
        this.south = () => this.matrix[this.position.y + 1][this.position.x];
        this.southWest = () => this.matrix[this.position.y + 1][this.position.x - 1];
        this.west = () => this.matrix[this.position.y][this.position.x - 1];
        this.northWest = () => this.matrix[this.position.y - 1][this.position.x - 1];
    }

    step(ellapsedTimeMilliseconds) { //FALL - APPLYING GRAVITY //accelerate over time Time
        let moved = 1;
        if(this.position.y < this.matrix.length - 1){ // FLOOR

            this.matrix[this.position.y][this.position.x] = undefined; // begin move

            if (!this.south()) { //LOOK DOWN
                this.position.y += 1; //MOVE DOWN
            } else if (!this.southWest()) { //LOOK DOWN AND LEFT
                this.position.y += 1; //MOVE DOWN
                this.position.x -= 1; //MOVE LEFT
            } else if (!this.southEast()) { //LOOK DOWN AND RIGHT
                this.position.y += 1; //MOVE DOWN
                this.position.x += 1; //MOVE RIGHT
            } else {
                //Don't move
                moved=0;
            }
        }else{
            moved = 0;
        }
        
        this.matrix[this.position.y][this.position.x] = this; // end move
        
        return moved;
    }
}
// How do we measure time? Seconds? by how far at a specific speed. Milliseconds.
// Tick as in tic-tock single cycle of a cpu

class MatrixFactory {
    static make(width, height) {
        const data = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(undefined);
            }
            data.push(row);
        }
        return data;
    }
}

class RandomUtils {
    static getBellCurveDistribution() {
        return (Math.random() + Math.random() + Math.random()) / 3;
    }
}

class World { // SCREEN/PAGE/WINDOW
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.FLOOR = height; //Where do they stop
        this.TOP = 0; //ORIGIN - Where do they come from
        this.elementList = [];
        this.matrix = MatrixFactory.make(width, height);
    }
    add() {
        //insert element at the top of the list
        const e = new Element(this.getRandomTopPosition(), this.matrix);
        this.elementList.unshift(e); //push/shift into the beginning of array/list
        this.matrix[e.position.y][e.position.x] = e;
    }
    animate() {
        this.add();
        let i = this.elementList.length - 1;
        let moved = 0;
        while (i > -1) { //loop backwards
            moved += this.elementList[i].step();
            i--;
        }
        return moved;
    }
    getRandomTopPosition() {
        const bellCurveDistribution = RandomUtils.getBellCurveDistribution();
        const x = Math.round(this.width * bellCurveDistribution);
        return new Position(x, this.TOP);
    }
}
