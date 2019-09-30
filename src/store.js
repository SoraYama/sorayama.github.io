'use strict'
exports.__esModule = true
const redux1 = require('redux')
const reduxDevtoolsExtension1 = require('redux-devtools-extension')
// Actions
exports.TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
exports.toggleSidebar = function () {
  return {type: exports.TOGGLE_SIDEBAR}
}
// Reducer
exports.reducer = function (state, action) {
  switch (action.type) {
    case exports.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isSidebarVisible: !state.isSidebarVisible
      })
    default:
      return state
  }
}
// Store
exports.initialState = {isSidebarVisible: false}
exports.store = redux1.createStore(
  exports.reducer,
  exports.initialState,
  reduxDevtoolsExtension1.devToolsEnhancer({})
)
