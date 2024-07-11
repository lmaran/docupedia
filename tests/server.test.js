// const test = require('node:test'); // CommonJS module
// const assert = require('node:assert'); // CommonJS module

import test from "node:test"; // ECMAScript module
import assert from "node:assert"; // ECMAScript module

test("will pass", () => {
    // This test passes because it does not throw an exception.
    assert.equal(1, 1);
});

// test('will fail', (t) => {
//     // This test fails because it throws an exception.
//     assert.equal(1, 2);
// });
