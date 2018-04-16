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
Calling.prototype.set = function (name, value) {
    const self = this
    const data = extend.clone(self.settings.getData())
    self.settings.subscribe(
        extend(
            true,
            data,
            jm.create(name, value)
        ),
        {
            function: 'set',
            name: name
        }
    )
}

Calling.prototype.change = function (name, value) {
    const self = this
    const data = extend.clone(self.settings.getData())
    self.settings.subscribe(
        jm.change(name, data, value),
        {
            function: 'change',
            name: name
        }
    )
}

export default Calling
module.exports= Calling
