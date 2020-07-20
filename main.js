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

let wagon = new Wagon(2)
// Create three travelers
let henrietta = new Traveler('Henrietta')
let juan = new Traveler('Juan')
let maude = new Traveler('Maude')
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 2. The wagon starts with 2 seats. We haven't added travelers to the wagon yet.`)
wagon.join(henrietta)
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 1. Henrietta just joined.`)
wagon.join(juan)
wagon.join(maude)  // There is no room for her!
console.log(`Wagon Seat Count?: ${ wagon.getAvailableSeatCount() } – EXPECTED: 0 – There is no room for Maude, but Juan was able to join.`)
henrietta.hunt()   // Henrietta goes in search of food.
juan.eat()         // Juan eats – as Juan does. 🤣
juan.eat()         // Juan has run out of food!
console.log(juan)
console.log(`Wagon Should Quarantine?: ${ wagon.shouldQuarantine() } – EXPECTED: true. Juan has run out of food and become unhealthy!`)
console.log(`Wagon's Total Food?: ${ wagon.totalFood() } – EXPECTED: 3.`)