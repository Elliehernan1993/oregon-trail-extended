// Traveler -> (name (string),
//              food (init 1, int),
//              isHealthy (init true, bool))
class Traveler {
    constructor (name) {
        this.name = name
        this.food = 1
        this.isHealthy = true
    }
    // Increase food by 2
    hunt() {
        this.food += 2
    }

    // IF food >= 1, decrement food
    // ELSE isHealthy = false
    eat() {
        if (this.food >= 1) {
            this.food -= 1
        } else {         
            this.isHealthy = false
        }
    }
}
// Wagon -> (capacity (int), 
//           passengers (init [], array))
class Wagon {
    constructor (capacity) {
        this.capacity = capacity
        this.passengers = []
    }

    getAvailableSeatCount() {
        return this.capacity - this.passengers.length
    }
    // IF getAvailableSeatCount > 0, 
    //      add traveler to wagon
    // ELSE log 'NO SPACE'
    join(traveler){
        if (this.getAvailableSeatCount() > 0) {
            this.passengers.push(traveler)
        } else {
            console.log("NO SPACE")
        }
    }
    // IF any passenger.isHealthy = false, 
    //      return true
    // else false
    shouldQuarantine() {
        if (this.passengers.find(passenger =>
            passenger.isHealthy === false )) {
            return true
        } else {
            return false
        }
    }

    // return total food of passengers
    totalFood() {
        return this.passengers.reduce((accumulator, passenger) => accumulator + passenger.food, 0)
        
    }

}

class Doctor extends Traveler {
    constructor(name){
        super(name)
    }

    heal(traveler) {
        traveler.isHealthy = true
    }
}

class Hunter extends Traveler {
    constructor(name){
        super(name)
        this.food = 2
    }

    hunt() {
        this.food += 5
    }

    eat() {
        if (this.food >= 2){
            this.food -= 2
        } else {
            this.food = 0
            this.isHealthy = false
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if (this.food >= numOfFoodUnits){
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        } else {
            console.log('Not enough food')
        }
    }





}


// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);