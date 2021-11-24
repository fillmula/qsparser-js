import assert from 'assert'
import { parse } from "../src"

test("test_parse_decodes_int_into_string", () => {
    let qs = 'a=5'
    let result = parse(qs)
    let expected = {'a': '5'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_float_into_string", () => {
    let qs = 'a=5.5'
    let result = parse(qs)
    let expected = {'a': '5.5'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_true_into_string", () => {
    let qs = 'a=true'
    let result = parse(qs)
    let expected = {'a': 'true'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_false_into_string", () => {
    let qs = 'a=false'
    let result = parse(qs)
    let expected = {'a': 'false'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_string_into_string", () => {
    let qs = 'a=b'
    let result = parse(qs)
    let expected = {'a': 'b'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_whitespaces", () => {
    let qs = 'a=b%20c'
    let result = parse(qs)
    let expected = {'a': 'b c'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_special_chars", () => {
    let qs = 'a=%E4%BF%8A'
    let result = parse(qs)
    let expected = {'a': '俊'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_multiple_items_to_a_single_object", () => {
    let qs = 'a=b&c=d'
    let result = parse(qs)
    let expected = {'a': 'b', 'c': 'd'}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_entries_into_multiple_nested_objects", () => {
    let qs = 'a[b]=c&d[e]=f&d[g]=h'
    let result = parse(qs)
    let expected = {'a': {'b': 'c'}, 'd': {'e': 'f', 'g': 'h'}}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_list_into_multiple_nested_object", () => {
    let qs = 'a[0]=1&a[1]=2&a[2]=3&b[0]=q&b[1]=w&b[2]=e'
    let result = parse(qs)
    let expected = {'a': ['1', '2', '3'], 'b': ['q' ,'w', 'e']}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_dicts_in_lists", () => {
    let qs = 'a[0][n]=John&a[0][a]=15&a[1][n]=Peter&a[1][a]=18&b[0][n]=Jack&b[0][a]=17'
    let result = parse(qs)
    let expected = {'a': [{'n': 'John', 'a': '15'},
                        {'n': 'Peter', 'a': '18'}],
                'b': [{'n': 'Jack', 'a': '17'}]}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_lists_in_dicts", () => {
    let qs = 'a[0][n][0]=John&a[0][n][1]=15&a[1][n][0]=Peter&a[1][n][1]=18&b[0][n][0]=Jack&b[0][n][1]=17'
    let result = parse(qs)
    let expected = {'a': [{'n': ['John', '15']},
                        {'n': ['Peter', '18']}],
                'b': [{'n': ['Jack', '17']}]}
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_a_long_string_into_nested_items", () => {
    let original = '_includes[0][favorites][_includes][0]=user'
    let expected = {"_includes": [{"favorites": {"_includes": ["user"]}}]}
    let result = parse(original)
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_empty_string_into_empty_object", () => {
    let original = ''
    let expected = {}
    let result = parse(original)
    assert.deepEqual(result, expected)
})

test("test_parse_decodes_null_into_null", () => {
    assert.deepEqual(parse("a=null"), {"a": null})
    assert.deepEqual(parse("a=Null"), {"a": null})
    assert.deepEqual(parse("a=NULL"), {"a": null})
    assert.deepEqual(parse("a=nil"), {"a": null})
    assert.deepEqual(parse("a=None"), {"a": null})
})

test("test_parse_decodes_null_string_into_null_string", () => {
    assert.deepEqual(parse("a=%60null%60"), {"a": "null"})
    assert.deepEqual(parse("a=%60Null%60"), {"a": "Null"})
    assert.deepEqual(parse("a=%60NULL%60"), {"a": "NULL"})
})

test("test_parse_decodes_none_string_into_none_string", () => {
    assert.deepEqual(parse("a=%60None%60"), {"a": "None"})
})

test("test_parse_decodes_nil_string_into_nil_string", () => {
    assert.deepEqual(parse("a=%60nil%60"), {"a": "nil"})
})
