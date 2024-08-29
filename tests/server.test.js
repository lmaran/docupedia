// const test = require('node:test'); // CommonJS module
// const assert = require('node:assert'); // CommonJS module

import assert from "node:assert"; // ECMAScript module
// import { describe, it } from "node:test";
import test from "node:test"; // ECMAScript module

test("will pass", () => {
    // This test passes because it does not throw an exception.
    assert.equal(1, 1);
});

// describe("formatFileSize function", () => {
//     it('should return "1.00 GB" for sizeBytes = 1073741824', () => {
//         assert.strictEqual(1, 1);
//     });
// });

// test('will fail', (t) => {
//     // This test fails because it throws an exception.
//     assert.equal(1, 2);
// });
