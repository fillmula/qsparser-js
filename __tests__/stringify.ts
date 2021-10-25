import {stringify} from "../src/index"

test("test stringify encodes int into int", () => {
    let obj = {'a': 5}
    let result = stringify(obj)
    let expected = 'a=5'
    assert.equals(result, expected)
})

test("test_stringify_encodes_float_into_float", () => {
    let obj = {'a': 5}
    let result = stringify(obj)
    let expected = 'a=5'
    assert.equals(result, expected)
})

test("test_stringify_encodes_true_into_true", () => {
    let obj = {'a': true}
    let result = stringify(obj)
    let expected = 'a=true'
    assert.equals(result, expected)
})

test("test stringify encodes false into false", () => {
    let obj = {'a': false}
    let result = stringify(obj)
    let expected = 'a=false'
    assert.equals(result, expected)
}

test("test stringify encodes string into string", () => {
    let obj = {'a': 'b'}
    let result = stringify(obj)
    let expected = 'a=b'
    assert.equals(result, expected)
}

test("test stringify encodes whitespaces", () => {
    let obj = {'a': 'b c'}
    let result = stringify(obj)
    let expected = 'a=b%20c'
    assert.equals(result, expected)
}

test("test stringify encodes special chars", () => {
    let obj = {'a': '俊'}
    let result = stringify(obj)
    let expected = 'a=%E4%BF%8A'
    assert.equals(result, expected)
})

test("test stringify concats multiple items with the ampersand", () => {
    let obj = {'a': 'b', 'c': 'd'}
    let result = stringify(obj)
    let expected = 'a=b&c=d'
    assert.equals(result, expected)
})

test("test stringify encodes dict into multiple entries", () => {
    let obj = {'a': {'b': 'c'}, 'd': {'e': 'f', 'g': 'h'}}
    let result = stringify(obj)
    let expected = 'a[b]=c&d[e]=f&d[g]=h'
    assert.equals(result, expected)
})

test("test stringify encodes list into multiple entries", () => {
    let obj = {'a': [1, 2, 3], 'b': ['q', 'w', 'e']}
    let result = stringify(obj)
    let expected = 'a[0]=1&a[1]=2&a[2]=3&b[0]=q&b[1]=w&b[2]=e'
    assert.equals(result, expected)
})

test("test stringify encodes nested items into a long string", () => {
    let original = {"_includes": [{"favorites": {"_includes": ["user"]}}]}
    let expected = '_includes[0][favorites][_includes][0]=user'
    let result = stringify(original)
    assert.equals(result, expected)
})
