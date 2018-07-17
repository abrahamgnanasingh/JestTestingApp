if (typeof require !== 'undefined') {
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    var dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>hello</body></html>`);
    var $ = require('jquery')(dom.window);
    var rewire = require('rewire');

    var Person = rewire('./person');
    Person = Person.__get__('Person');
}

function sayHello() {
    return 'hello';
}

function add(a, b) {
    return a + b;
}

function fetchTripDetails(success, error) {
    setTimeout(() => {
        if(true) {
            success({count: 30, visitingPlaces: 'Meghalaya, Cherrapunji'});
        } else {
            error('Failed to fetch trip details');
        }
    }, 3000);
}

function fetchSomeDetails() {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('oki');
    //     }, 3000);
    // });
    return $.ajax('http://date.jsontest.com');
}

function createPerson(firstName, lastName, age) {
    var p = new Person(firstName, lastName, age);
    // p.setFirstName(firstName);
    // p.setAge(age);
    return p;
}

// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = {
//         sayHello, //equal to sayHello: sayHello
//         add,
//         fetchTripDetails,
//         fetchSomeDetails,
//         createPerson
//     };
// }