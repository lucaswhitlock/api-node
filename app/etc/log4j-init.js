const log4js = require('log4js');

log4js.configure({
    appenders: {
        debug: {
            type: 'console'
        },
        error: {
            type: 'file', filename: '/errors.log'
        },
        info: {
            type: 'file', filename: '/info.log'
        },
        root: {
            type: 'file', filename: '/root.log'
        }
    },
    categories: {
        errors: {
            appenders: ['error'], level: 'ERROR'
        },
        info: {
            appenders: ['info'], level: 'INFO'
        },
        debug: {
            appenders: ['debug'], level: 'TRACE'
        },
        default: {
            appenders: ['root'], level: 'ALL'
        }
    }
})

module.exports = log4js;