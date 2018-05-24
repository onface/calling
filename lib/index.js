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
Calling.prototype.action = function (name, payload) {
    const self = this
    let settings = self.settings
    if (typeof settings.actions !== 'object') {
        return
    }
    if (typeof settings.actions[name] === 'function') {
        settings.actions[name](self, payload)
    }
}
Calling.prototype.effect = function (name, payload) {
    const self = this
    let settings = self.settings
    if (typeof settings.effects !== 'object') {
        return
    }
    if (typeof settings.effects[name] === 'function') {
        settings.effects[name](self, payload)
    }
}
Calling.prototype.emitChange = function (data) {
    const self = this
    let onChangeOutput = self.settings.onChange(data)
    let outputIsPromise = typeof onChangeOutput === 'object' && onChangeOutput.constructor === Promise
    if (outputIsPromise) {
        return onChangeOutput
    }
    else {
        return new Promise(function (resolve) {
            resolve()
        })
    }
}
Calling.prototype.value = function () {
    return this.settings.getValue()
}
Calling.prototype.true = function (name, settings) {
    const self = this
    return self.emitChange( jm.set(name, true, self.settings.getValue(), settings) )
}
Calling.prototype.false = function (name, settings) {
    const self = this
    return self.emitChange( jm.set(name, false, self.settings.getValue(), settings) )
}
Calling.prototype.query = function (queryString, settings) {
    const self = this
    return jm.query(queryString, self.settings.getValue(), settings)
}
Calling.prototype.get = Calling.prototype.query
Calling.prototype.queryAll = function (queryString, settings) {
    const self = this
    return jm.queryAll(queryString, self.settings.getValue(), settings)
}
Calling.prototype.getAll = Calling.prototype.queryAll
Calling.prototype.set = function (name, value, settings) {
    const self = this
    return self.emitChange( jm.set(name, value, self.settings.getValue(), settings) )
}
Calling.prototype.push = function (name, value, settings) {
    const self = this
    return self.emitChange( jm.push(name, value, self.settings.getValue(), settings) )
}
Calling.prototype.unshift = function (name, value, settings) {
    const self = this
    return self.emitChange( jm.unshift(name, value, self.settings.getValue(), settings) )
}
Calling.prototype.delete = function (name, settings) {
    const self = this
    return self.emitChange( jm.delete(name, self.settings.getValue(), settings) )
}
Calling.prototype.replace = function (name, value, settings) {
    const self = this
    return self.emitChange( jm.replace(name, value, self.settings.getValue(), settings) )
}
Calling.createReact = createReact
export default Calling
module.exports= Calling
