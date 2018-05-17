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
            getValue: () => self.state,
            onChange: (data, done) => self.setState(data, done)
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
                {' '}
                <button
                    onClick={() => {
                        self.call.set(
                            'list[{name:"nimo"}]',
                            {
                                random: Math.random()
                            }
                        )
                    }}
                >{`list[{name:"nimo"}]`}</button>
                {' '}
                <button
                    onClick={() => {
                        self.call.delete(
                            'list[{name:"nico"}]'
                        )
                    }}
                >{`delete list[{name:"nico"}]`}</button>
                {' '}
                <button
                    onClick={() => {
                        self.call.push(
                            'list',
                            {
                                new: Math.random()
                            }
                        )
                    }}
                >push</button>
                {' '}
                <button
                    onClick={() => {
                        self.call.unshift(
                            'list',
                            {
                                new: Math.random()
                            }
                        )
                    }}
                >unshift</button>
                {' '}
                <button
                    onClick={() => {
                        self.call.replace(
                            'list[{name:"nimo"}]',
                            {
                                replace: Math.random()
                            }
                        )
                    }}
                >replace</button>
                {' '}
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
