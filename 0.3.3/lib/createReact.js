import Calling from "./index"
import React , { Component } from "react"
import extend from "safe-extend"
module.exports = function createReact (UserComponent, settings) {
    return class CallingReact extends Component {
        constructor (props) {
            super(props)
            const self = this
            settings = extend(true, {name: 'store'}, settings)
            if (settings.name) {
                self.state = UserComponent.defaultProps[settings.name]
            }
            else {
                self.state = UserComponent.defaultProps
            }
            let useCache = /cacache/.test(location.search)
            if (useCache && localStorage.getItem('calling_cache')) {
                self.state = JSON.parse(localStorage.getItem('calling_cache'))
            }
            self.ca = new Calling({
                actions: typeof UserComponent.actions === 'function'?UserComponent.actions():undefined,
                getValue: () => {
                    return self.state
                },
                onChange: (data) => {
                    if (useCache) {
                        localStorage.setItem('calling_cache', JSON.stringify(data))
                    }
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
            if (settings.name) {
                store[settings.name] = cloneState
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
