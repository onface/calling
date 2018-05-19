var Calling = require('calling')
import React , { Component } from "react"
class Basic extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const self = this
        const ca = self.props.ca
        const store = ca.value()
        return (
            <div>
                <button
                    onClick={function (){
                        ca.set('name', 'nimo' + Math.random())
                        ca.set('nickname', 'cute ' + ca.get('name'))
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
                <pre>state:{JSON.stringify(self.state, null, 4)}</pre>
                <pre>store:{JSON.stringify(store, null, 4)}</pre>
                <hr />
                <button
                    onClick={() => {
                        ca.set('one', Math.random())
                    }}
                >set</button>
                {' '}
                <button
                    onClick={() => {
                        ca.set(
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
                        ca.delete(
                            'list[{name:"nico"}]'
                        )
                    }}
                >{`delete list[{name:"nico"}]`}</button>
                {' '}
                <button
                    onClick={() => {
                        ca.push(
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
                        ca.unshift(
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
                        ca.replace(
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
                {`get('list[{name:"nimo"}].age')`} // {ca.get('list[{name:"nimo"}].age')}
                </code>
                <hr />
                <code>
                {`getAll('list[{name:"nimo"}]')`} // {
                    JSON.stringify(
                        ca.getAll('list[{name:"nimo"}]')
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
