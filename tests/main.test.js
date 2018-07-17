if (typeof require !== 'undefined') {
  var expect = require('chai').expect;
  var assert = require('chai').assert;
  // var assert = require('assert');
  var should = require('chai').should();
  // var main = require ('../main');
  var rewire = require('rewire');
  var main = rewire('../main');
  var dom = main.__get__('dom');
  var sayHello = main.__get__('sayHello');
  var add = main.__get__('add');
  var fetchTripDetails = main.__get__('fetchTripDetails');
  var fetchSomeDetails = main.__get__('fetchSomeDetails');
  var createPerson = main.__get__('createPerson');
}

describe('#initial tests', function() {
  var user = {
    name: 'Aaron',
    age: 21
  };
  it('should validate user object', function() {
    expect('Baahubali' === '2.o').to.be.false;
    expect(user.name).to.equal('Aaron');
    assert.isDefined(user);

    // assert.equal([1,2,3].indexOf(4), -1);
    assert.isObject(user);
    assert.isString(user.name);
    assert.typeOf(user.age, 'number');

    // sayHello().should.be.a('function');
    user.should.be.a('object');
    user.age.should.not.equal(22);
  });

  it('should validate dom', function() {
    expect(dom.window.document.documentElement.outerHTML).to.equal('<html><head></head><body>hello</body></html>');
  });
});

describe('sayHello()', function() {
  it('should return hello', function() {
    assert.equal(sayHello(), 'hello');
  });

  it('should return string', function() {
    assert.typeOf(sayHello(), 'string');
  });
});

describe('add()', function() { //name of test module
  var result = add(1, 4);
  
  it('should return a + b', function() { //description of test module
    assert.equal(result, 5);
    assert.isAbove(result, 4);
  });

  it('should return number', function() { //description of test module
    assert.typeOf(result, 'number');
  });
});

describe('#hooks', function() {
  var user = 'Aaron';
  beforeEach(function(done) {
    setTimeout(function() {
      user = 'Prinkle';
      done();
    }, 1000);
  });

  it('should test changes made in beforeEach', function() {
    expect(user).to.equal('Prinkle');
    user = 'Aaron';
  });

  it('should test changes made in beforeEach again', function() {
    expect(user).to.equal('Prinkle');
  });
});

describe('#asynchronous testing', function() {
  // this.timeout(10000); //default timeout is 2000 ms

  it('should test callbacks', function(done) {
    fetchTripDetails(function(result) {
      expect(result).to.be.a('object');
      expect(result.count).to.be.a('number');
      expect(result.count).to.equal(30);
      expect(result.visitingPlaces).to.be.a('string');
      done();
    });
  });

  it('should test promises', function(done) {
    fetchSomeDetails().then(function(result) {
      // expect(result).to.equal('oki');
      expect(result).to.be.a('object');
      expect(result.time).to.be.a('string');
      expect(result.milliseconds_since_epoch).to.be.a('number');
      expect(result.date).to.be.a('string');
      done();
    });
  });
});

describe('#prototype/object testing', function() {
  it('should test changes made', function() {
    var person1 = createPerson('Aaron', 'Davies', 23);
    assert.equal(person1.getFullName(), 'Aaron Davies');
    assert.equal(person1.getAge(), 23);
  });
});