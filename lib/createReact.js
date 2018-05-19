import Calling from "./index"
import React , { Component } from "react"
import extend from "safe-extend"
module.exports = function createReact (UserComponent) {
    return class CallingReact extends Component {
        constructor (props) {
            super(props)
            const self = this
            self.state = UserComponent.defaultProps
            self.ca = new Calling({
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
            return <UserComponent
                        {...self.state}
                        ca={self.ca}
                        ref={(node) => {
                            self.$refs = self.$refs || {}
                            self.$refs.root = node
                        }}
                    />
        }
    }
}
