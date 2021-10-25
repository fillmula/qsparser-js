
export function stringify(obj: {[key: string]: any}){
    let tokens: string[] = []
    Object.keys(obj).forEach(function(key) {
        tokens = [key + "=" + obj[key]]
    })
    return tokens.join('&')
}

export function genTokens(items: string[], value: any): string[] {
    let result: string[] = []
    if (value === true) {
        return [`${genKey(items)}=true`]
    }
    else if (value === false) {
        return [`${genKey(items)}=false`]
    }
    else if (value === null) {
        return [`${genKey(items)}=null`]
    }
    else if (value instanceof Array) {
        value.forEach(function (v, i) {
            result.push(...genTokens([...items, ...[i.toString()]], v))
        })
        return result
    }
    else if (value instanceof Object) {

        for (var k, v in Object.entries(value)) {

        }
        return result
    }
    else {
        return [`${items[0]}='${value}'`]
    }
}

export function genKey(items: string[]) {
    return `${items[0]}[${items.join('][')}]`.replace(/.{0, 2}$/, '')
}

function parse(qs: string) {
    let result = {}
    if (qs === '') {
        return result
    }
    let tokens = qs.split('&')
    for (let token in tokens) {
        let [key, value] = token.split('=')
        let items = key.replace(/\]$/, "").split(/\]?\[/)
        assignToResult(result, items, value)
    }
    return result
}

export function assignToResult(result: {[key: string]: any} | any[],
                        items: any[],
                        value: string) {

    if (items.length === 1) {
        if (result instanceof Object) {
            result[items[0] as keyof Object] =
        }
    }

}

// if len(items) == 1:
//         if isinstance(result, dict):
//             result[items[0]] = unquote(value)
//         else:
//             result.append(unquote(value))
//         return result
//     if isinstance(result, dict) and items[0] not in result:
//         if len(items) > 1 and items[1] == '0':
//             result[items[0]] = []
//         else:
//             result[items[0]] = {}
//     if isinstance(result, list) and int(items[0]) >= len(result):
//         if len(items) > 1 and items[1] == '0':
//             result.append([])
//         else:
//             result.append({})
//     if isinstance(result, dict):
//         assign_to_result(result[items[0]], items[1:], value)
//     else:
//         assign_to_result(result[int(items[0])], items[1:], value)
//     return result
