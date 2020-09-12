// here "module.exports" is allowed due to the override in .eslintrc.yaml
module.exports = {
  poweredByHeader: false,
  someValue: testFunc()
}

// here a no return type is permitted since this isn't a ts/tsx file
function testFunc () {
  return "http://localhost:3000"
}

