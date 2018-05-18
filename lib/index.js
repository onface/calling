const jm = require('json-modif')
const extend = require('safe-extend')
const delayEach = require('delayeach')
const createReact = require('./createReact')
class Calling {
    constructor (settings) {
        const self = this
        self.settings = settings
    }
}
Calling.prototype.true = function (name, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.set(name, true, self.settings.getValue(), settings),
            resolve
        )
    })
}
Calling.prototype.false = function (name, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.set(name, false, self.settings.getValue(), settings),
            resolve
        )
    })
}
Calling.prototype.query = function (queryString, settings) {
    const self = this
    return jm.query(queryString, self.settings.getValue(), settings)
}
Calling.prototype.queryAll = function (queryString, settings) {
    const self = this
    return jm.queryAll(queryString, self.settings.getValue(), settings)
}
Calling.prototype.set = function (name, value, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.set(name, value, self.settings.getValue(), settings),
            resolve
        )
    })
}
Calling.prototype.push = function (name, value, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.push(name, value, self.settings.getValue(), settings),
            resolve
        )
    })
}
Calling.prototype.unshift = function (name, value, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.unshift(name, value, self.settings.getValue(), settings),
            resolve

        )
    })
}
Calling.prototype.delete = function (name, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.delete(name, self.settings.getValue(), settings),
            resolve
        )
    })
}
Calling.prototype.replace = function (name, value, settings) {
    const self = this
    return new Promise(function (resolve) {
        self.settings.onChange(
            jm.replace(name, value, self.settings.getValue(), settings),
            resolve
        )
    })
}
// Calling.prototype.change = function (name, value) {
//     return new Promise(function (resolve) {
//         self.settings.onChange(
//             jm.change(name, value, self.settings.getValue(), settings),
//             resolve
//         )
//     })
// }
Calling.createReact = createReact
export default Calling
module.exports= Calling
