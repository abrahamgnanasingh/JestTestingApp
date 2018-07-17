function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    this.getFirstName = function() {
        return this.firstName;
    };

    this.setFirstName = function(firstName) {
        this.firstName = firstName;
    };

    this.getLastName = function() {
        return this.lastName;
    };

    this.setLastName = function(lastName) {
        this.lastName = lastName;
    };

    this.getFullName = function() {
        return `${this.firstName} ${this.lastName}`;
    };
}

Person.prototype.getAge = function() {
    return this.age;
};

Person.prototype.setAge = function(age) {
    this.age = age;
};

// module.exports = Person;