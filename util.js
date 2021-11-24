function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let res = []

            req.on(
                'data', 
                (chunk) => res.push(String(chunk))
            )

            req.on(
                'end',
                () => resolve(res)
            )
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getReqData
}