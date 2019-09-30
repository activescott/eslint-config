/* eslint-env node */
// here "module.exports" is only allowed due to the environment declaration above.
module.exports = {
  poweredByHeader: false,
  someValue: testFunc()
}

// here a no return type is permitted since this isn't a ts/tsx file
function testFunc () {
  return "http://localhost:3000"
}

