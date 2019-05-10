const getIPAddress = () => {
    const interfaces = require('os').networkInterfaces()
    for (let devName in interfaces) {
        for (let alias of interfaces[devName]) {
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

let ipAddress = ''

module.exports = () => {
    if (!ipAddress) {
        ipAddress = getIPAddress()
    }

    return ipAddress
}
