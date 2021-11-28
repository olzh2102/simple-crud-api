const { writeFile } = require('fs')
const path = require('path')

function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let res = ''

            req.on('data', (chunk) => {res += String(chunk)})
            req.on('end',() => resolve(res))
        } catch (error) {
            reject(error)
        }
    })
}

function handleResponse(res) {
    return (statusCode) => (data) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }
}

function writeInto(filename, data) {
    return new Promise((_, reject) => {
        writeFile(
            path.join(__dirname, filename), 
            JSON.stringify(data), 
            'utf-8',
            (err) =>  {
                if (err) reject(err)
            }
        )
    })
}

function hasRequiredFields(fields) {
    return (obj) => fields.every((f) => obj.hasOwnProperty(f))
}

function isCorrectType(obj) {
    const keys = Object.keys(obj)
    let res = []

    for (let key of keys) {
        if (key == 'name' && typeof obj[key] !== 'string')
            res.push(`"name" property value has to be "String"`)

        if (key == 'age' && typeof obj[key] !== 'number')
            res.push(`"age" property value has to be "Number"`)

        if (key == 'hobbies') {
            if (!Array.isArray(obj[key])) {
                res.push(`"hobbies" property value has to be "List"`)
            }

            if(Array.isArray(obj[key]) && obj[key].some((v) => typeof v !== 'string')) {
                res.push(`"hobbies" property item values has to be "String"`)
            }
        }
    }

    return res
}

module.exports = {
    getReqData,
    handleResponse,
    writeInto,
    hasRequiredFields,
    isCorrectType
}