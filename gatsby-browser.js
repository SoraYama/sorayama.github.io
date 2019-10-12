import React from 'react'

import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store from './src/redux'

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`该应用已经更新, 要重新载入吗?`)
  if (answer === true) {
    window.location.reload()
  }
}

export const replaceRouterComponent = ({ history }) => ({ children }) => (
  <Provider store={store}>
    <Router history={history}>{children}</Router>
  </Provider>
)
