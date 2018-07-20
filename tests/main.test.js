var originalExpect = global.expect;
var chai = require('chai');
// var spies = require('chai-spies');
// chai.use(spies);

var expect = chai.expect;
var assert = chai.assert;
// var assert = require('assert');
var should = chai.should();
// var main = require ('../main');
var rewire = require('rewire');
var main = rewire('../main');
var dom = main.__get__('dom');
var sayHello = main.__get__('sayHello');
var add = main.__get__('add');
var fetchTripDetails = main.__get__('fetchTripDetails');
var fetchSomeDetails = main.__get__('fetchSomeDetails');
var createPerson = main.__get__('createPerson');
var Person = rewire('../person');
Person = Person.__get__('Person');

describe('#initial tests', function() {
  var user = {
    name: 'Aaron',
    age: 21
  };
  it('should validate user object', function() {
    expect('Baahubali' === '2.o').to.be.false;
    expect(user.name).to.equal('Aaron');

    // assert.equal([1,2,3].indexOf(4), -1);
    assert.isDefined(user);
    assert.isObject(user);
    assert.isString(user.name);
    assert.typeOf(user.age, 'number');
    assert.isFunction(sayHello);

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

describe('#prototype/object testing', function() {
  it('should test changes made', function() {
    var person1 = createPerson('Aaron', 'Davies', 23);
    assert.equal(person1.getFullName(), 'Aaron Davies');
    assert.equal(person1.getAge(), 23);
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
  jest.setTimeout(20000); //overriding default timeout of 5000 ms

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

describe('#mocks', function() {
  it('should test mock function', function() {
    var mockCallback = jest.fn();
    var fruits = ['Apple', 'Orange', 'Mango'];
    fruits.forEach(mockCallback);

    expect(mockCallback.mock.calls.length).to.equal(3);
    // The first argument of the first call to the function was 'Apple'
    expect(mockCallback.mock.calls[0][0]).to.equal('Apple');
    // The first argument of the third call to the function was 'Mango'
    expect(mockCallback.mock.calls[2][0]).to.equal('Mango');

    var mockFn = jest.fn(() => 'hello');
    mockFn();
    originalExpect(mockFn).toBeCalled();
    originalExpect(mockFn).toHaveBeenCalledTimes(1);
    originalExpect(mockFn).toHaveReturnedWith('hello');
  });
});

describe('#spy', function() {
  it('should test spies', function() {
    var person1 = new Person('Aaron', 'Davies', 23);
    var spy = jest.spyOn(person1, 'setFirstName');
    person1.setFirstName('Abraham');
    originalExpect(spy).toHaveBeenCalledWith('Abraham');

    spy.mockImplementation(() => 'mock');
    person1.setFirstName('Abraham');
    originalExpect(spy).toHaveReturnedWith('mock');

    spy.mockReset();
    person1.setFirstName('Gnanasingh');
    originalExpect(spy).toHaveBeenCalledWith('Gnanasingh');
  });
});

describe('#snapshot testing', function() {
  // it('will fail every time', () => {
  //   const user = {
  //     createdAt: new Date(),
  //     id: Math.floor(Math.random() * 20),
  //     name: 'LeBron James'
  //   };
  
  //   originalExpect(user).toMatchSnapshot();
  // });

  it('will check the matchers and pass', () => {
    const user = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: 'LeBron James'
    };
  
    originalExpect(user).toMatchSnapshot({
      createdAt: originalExpect.any(Date),
      id: originalExpect.any(Number)
      // name: 'LeBron James'
    });
  });
});