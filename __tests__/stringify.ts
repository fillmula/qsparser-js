import assert from 'assert'
import { stringify } from "../src"

test("test stringify encodes int into int", () => {
    let obj = {'a': 5}
    let result = stringify(obj)
    let expected = 'a=5'
    assert.equal(result, expected)
})

test("test_stringify_encodes_float_into_float", () => {
    let obj = {'a': 5}
    let result = stringify(obj)
    let expected = 'a=5'
    assert.equal(result, expected)
})

test("test_stringify_encodes_true_into_true", () => {
    let obj = {'a': true}
    let result = stringify(obj)
    let expected = 'a=true'
    assert.equal(result, expected)
})

test("test stringify encodes false into false", () => {
    let obj = {'a': false}
    let result = stringify(obj)
    let expected = 'a=false'
    assert.equal(result, expected)
})

test("test stringify encodes string into string", () => {
    let obj = {'a': 'b'}
    let result = stringify(obj)
    let expected = 'a=b'
    assert.equal(result, expected)
})

test("test stringify encodes whitespaces", () => {
    let obj = {'a': 'b c'}
    let result = stringify(obj)
    let expected = 'a=b%20c'
    assert.equal(result, expected)
})

test("test stringify encodes special chars", () => {
    let obj = {'a': '俊'}
    let result = stringify(obj)
    let expected = 'a=%E4%BF%8A'
    assert.equal(result, expected)
})

test("test stringify concats multiple items with the ampersand", () => {
    let obj = {'a': 'b', 'c': 'd'}
    let result = stringify(obj)
    let expected = 'a=b&c=d'
    assert.equal(result, expected)
})

test("test stringify encodes dict into multiple entries", () => {
    let obj = {'a': {'b': 'c'}, 'd': {'e': 'f', 'g': 'h'}}
    let result = stringify(obj)
    let expected = 'a[b]=c&d[e]=f&d[g]=h'
    assert.equal(result, expected)
})

test("test stringify encodes list into multiple entries", () => {
    let obj = {'a': [1, 2, 3], 'b': ['q', 'w', 'e']}
    let result = stringify(obj)
    let expected = 'a[0]=1&a[1]=2&a[2]=3&b[0]=q&b[1]=w&b[2]=e'
    assert.equal(result, expected)
})

test("test stringify encodes nested items into a long string", () => {
    let original = {"_includes": [{"favorites": {"_includes": ["user"]}}]}
    let expected = '_includes[0][favorites][_includes][0]=user'
    let result = stringify(original)
    assert.equal(result, expected)
})

test("test_stringify_encodes_none_into_null", () => {
    assert.equal(stringify({"a":  null}), "a=null")
})

test("test_stringify_encodes_null_string_into_null_string", () => {
    assert.equal(stringify({"a": "null"}), "a=%60null%60")
    assert.equal(stringify({"a": "Null"}), "a=%60Null%60")
    assert.equal(stringify({"a": "NULL"}), "a=%60NULL%60")
})

test("test_stringify_encodes_none_string_into_none_string", () => {
    assert.equal(stringify({"a": "None"}), "a=%60None%60")
})

test("test_stringify_encodes_nil_string_into_nil_string", () => {
    assert.equal(stringify({"a": "nil"}), "a=%60nil%60")
})

test("test stringify encodes date into date string", () => {
    assert.equal(
        stringify({"a": new Date(Date.UTC(2020, 11, 24, 0, 0, 0, 0))}),
        "a=2020-12-24T00%3A00%3A00.000Z"
    )
})
