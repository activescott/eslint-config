// here "module.exports" is allowed due to an override in config
module.exports = {
  poweredByHeader: false,
  someValue: testFunc()
}

// here a no return type is permitted since this isn't a ts/tsx file
function testFunction () {
  return "http://localhost:3000"
}

testFunction()
