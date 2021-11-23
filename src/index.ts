export function stringify(obj: {[key: string]: any}): string {
    return Object.entries(obj).map(([key, value]) => {
        return genTokens([key], value)
    }).flat(Number.MAX_SAFE_INTEGER).join('&')
}

function escapeNull(qs: string){
    switch(qs){
        case 'null':
            return '`null`'
        case 'Null':
            return '`Null`'
        case 'NULL':
            return '`NULL`'
        case 'nil':
            return '`nil`'
        case 'None':
            return '`None`'
        default:
            return qs
    }
}

function unescapeNull(qs: String){
    switch(qs){
        case  '`null`':
            return 'null'
        case  '`Null`' :
            return 'Null'
        case  '`NULL`':
            return 'NULL'
        case  '`nil`':
            return 'nil'
        case   '`None`':
            return 'None'
        case  'null':
            return null
        case  'Null':
            return null
        case   'NULL':
            return null
        case  'nil':
            return null
        case   'None':
            return null
        default:
            return qs
    }

}

function genTokens(items: string[], value: any): string[] {
    if (value === true) {
        return [`${genKey(items)}=true`]
    } else if (value === false) {
        return [`${genKey(items)}=false`]
    } else if (value === null) {
        return [`${genKey(items)}=null`]
    } else if (Array.isArray(value)) {
        return [].concat.apply((value).map((v, i) => {
            return genTokens([...items, String(i)], v)
        }))
    } else if (value === undefined) {
        return []
    } else if (value instanceof Date) {
        return [`${genKey(items)}=${encodeURIComponent(value.toISOString())}`]
    } else if (typeof value === 'object') {
        return [].concat.apply(Object.entries(value).map(([k, v]) => {
            return genTokens([...items, String(k)], v)
        }))
    } else if  (typeof value === 'string'){
        return [`${genKey(items)}=${encodeURIComponent(escapeNull(value))}`]
    } else if (value === undefined) {
        return []
    } else {
        return [`${genKey(items)}=${encodeURIComponent(String(value))}`]
    }
}

function genKey(items: string[]) {
    return `${items[0]}[${items.slice(1).join('][')}]`.replace(/\[\]$/, '')
}

export function parse(qs: string) {
    const result = {}
    if (qs === '') {
        return result
    }
    qs.split('&').map((token) => {
        const [key, value] = token.split('=')
        const items = key.replace(/\]$/, "").split(/\]?\[/)
        assignToResult(result, items, value)
    })
    return result
}

function assignToResult(
    result: {[key: string]: any} | any[],
    items: any[],
    value: string
) {
    if (items.length === 1) {
        if (Array.isArray(result)) {
            result.push(unescapeNull(decodeURIComponent(value)))
        } else {
            result[items[0]] = unescapeNull(decodeURIComponent(value))
        }
        return
    }
    if (Array.isArray(result)) {
        if (Number(items[0]) >= result.length) {
            if ((items.length > 1) && (items[1] === '0')) {
                result.push([])
            } else {
                result.push({})
            }
        }
    } else {
        if (!(items[0] in result)) {
            if ((items.length > 1) && (items[1] === '0')) {
                result[items[0]] = []
            } else {
                result[items[0]] = {}
            }
        }
    }
    if (Array.isArray(result)) {
        assignToResult(result[Number(items[0])], items.slice(1), value)
    } else {
        assignToResult(result[items[0]], items.slice(1), value)
    }
}
