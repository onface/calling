import Calling from "./index"
import React , { Component } from "react"
import extend from "safe-extend"
module.exports = function createReact (UserComponent, name = 'store') {
    return class CallingReact extends Component {
        constructor (props) {
            super(props)
            const self = this

            if (name) {
                self.state = UserComponent.defaultProps[name]
            }
            else {
                self.state = UserComponent.defaultProps
            }
            self.ca = new Calling({
                actions: typeof UserComponent.actions === 'function'?UserComponent.actions():undefined,
                getValue: () => self.state,
                onChange: (data) => {
                    // 解决 setState 异步调用导致 getValue 获取不到
                    self.state = data
                    return new Promise((resolve) => {
                        self.setState(data, resolve)
                    })
                }
            })
        }
        render() {
            const self = this
            let cloneState = extend.clone(self.state)
            let store = {}
            if (name) {
                store[name] = cloneState
            }
            else {
                store = cloneState
            }
            return <UserComponent
                        {...store}
                        ca={self.ca}
                        ref={(node) => {
                            self.$refs = self.$refs || {}
                            self.$refs.root = node
                        }}
                    />
        }
    }
}
