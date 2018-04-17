const jm = require('json-modif')
const extend = require('safe-extend')
class Calling {
    constructor (settings) {
        const self = this
        self.settings = settings
    }
}
Calling.prototype.query = function (queryString, settings) {
    const self = this
    return jm.query(queryString, self.settings.getData(), settings)
}
Calling.prototype.queryAll = function (queryString, settings) {
    const self = this
    return jm.queryAll(queryString, self.settings.getData(), settings)
}
Calling.prototype.set = function (name, value, settings) {
    const self = this
    this.settings.subscribe(
        jm.set(name, value, this.settings.getData(), settings),
        {
            function: 'set',
            name
        }
    )
}
Calling.prototype.push = function (name, value, settings) {
    const self = this
    this.settings.subscribe(
        jm.push(name, value, this.settings.getData(), settings),
        {
            function: 'push',
            name
        }
    )
}
Calling.prototype.unshift = function (name, value, settings) {
    const self = this
    this.settings.subscribe(
        jm.unshift(name, value, this.settings.getData(), settings),
        {
            function: 'unshift',
            name
        }
    )
}
Calling.prototype.delete = function (name, settings) {
    const self = this
    this.settings.subscribe(
        jm.delete(name, this.settings.getData(), settings),
        {
            function: 'delete',
            name
        }
    )
}
Calling.prototype.replace = function (name, value, settings) {
    const self = this
    this.settings.subscribe(
        jm.replace(name, value, this.settings.getData(), settings),
        {
            function: 'replace',
            name
        }
    )
}
Calling.prototype.change = function (name, value) {
    this.settings.subscribe(
        jm.change(name, value, this.settings.getData(), settings),
        {
            function: 'change',
            name
        }
    )
}

export default Calling
module.exports= Calling
