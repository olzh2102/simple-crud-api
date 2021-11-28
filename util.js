function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let res = ''

            req.on(
                'data', 
                (chunk) => {
                    res += String(chunk)
                }
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

function listenOn(port) {
    return () => console.log(`server is running on port: ${port}`)
}

function routeNotFound(res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = {
    getReqData,
    listenOn,
    routeNotFound
}