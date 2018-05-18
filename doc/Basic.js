var Calling = require('calling')
var jsonformat = require('json-format')
import React , { Component } from "react"
import apiGroup from "../m/api/group"
class Basic extends Component {
    constructor(props) {
        super(props)
        self.ca = props.ca
    }
    render() {
        const self = this
        return (
            <div>
                <button
                    onClick={function (){
                        self.ca.set('name', 'nimo' + Math.random())
                        self.props.ca.set('nickname', 'cute ' + self.props.ca.query('name'))
                    }}
                >
                    set props sync
                </button>
                <button
                    onClick={function (){
                        self.setState({
                            name: 'nimo' + Math.random()
                        })
                        self.setState({
                            nickname: 'cute ' + self.state.name
                        })
                    }}
                >
                    set state sync (throw error)
                </button>
                <pre>state:{jsonformat(self.state)}</pre>
                <pre>props:{jsonformat(self.props)}</pre>
                <hr />
                <button
                    onClick={() => {
                        self.props.ca.set('one', Math.random())
                    }}
                >set</button>
                {' '}
                <button
                    onClick={() => {
                        self.props.ca.set(
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
                        self.props.ca.delete(
                            'list[{name:"nico"}]'
                        )
                    }}
                >{`delete list[{name:"nico"}]`}</button>
                {' '}
                <button
                    onClick={() => {
                        self.props.ca.push(
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
                        self.props.ca.unshift(
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
                        self.props.ca.replace(
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
                {`query('list[{name:"nimo"}].age')`} // {self.props.ca.query('list[{name:"nimo"}].age')}
                </code>
                <hr />
                <code>
                {`queryAll('list[{name:"nimo"}]')`} // {
                    JSON.stringify(
                        self.props.ca.queryAll('list[{name:"nimo"}]')
                    )
                }
                </code>
            </div>
        )
    }
}
Basic.defaultProps = {
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
Basic = Calling.createReact(Basic)
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
