var Calling = require('calling')
var jsonformat = require('json-format')
import React , { Component } from "react"
class Basic extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            one: 'abc',
            list: [
                {
                    name: 'nimo',
                    age: 25
                },
                {
                    name: 'nico',
                    age: '18'
                },
                {
                    name: 'nimo',
                    gender: 'male'
                }
            ]
        }
        self.call = new Calling({
            getData: function () {
                return self.state
            },
            subscribe: function (data, info) {
                self.setState(data)
            }
        })
    }
    render() {
        const self = this
        return (
            <div>
                <pre>{jsonformat(self.state)}</pre>
                <hr />
                <button
                    onClick={() => {
                        self.call.set('one', Math.random())
                    }}
                >set</button>
                <hr />
                <button onClick={() => self.call.change('list[{name:"nimo"}]', {random: Math.random()}, {all: true})} >change</button>
                <hr />
                <code>
                {`query('list[{name:"nimo"}].age')`} // {self.call.query('list[{name:"nimo"}].age')}
                </code>
                <hr />
                <code>
                {`queryAll('list[{name:"nimo"}]')`} // {
                    JSON.stringify(
                        self.call.queryAll('list[{name:"nimo"}]')
                    )
                }
                </code>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
