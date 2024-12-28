function getFuncValue(f, v) {
    if (f[0] === 'Const') {
        return {'Value': f[1], 'Var': v}
    } else if (f[0] === 'Var') {
        return {'Value': v[f[1]], 'Var': v}
    }

    if (f[0] === 'Add') {
        return {'Value': getFuncValue(f[1], v)['Value'] + getFuncValue(f[2], v)['Value'], 'Var': v}
    }
}

function convStrToFunc(str) {
    let convFunc = []
    convFunc.push(parseInt(str))
    return convFunc
}