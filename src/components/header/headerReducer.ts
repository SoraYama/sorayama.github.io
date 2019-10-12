import { createReducer } from 'typesafe-actions'
import { changeHeaderStatus } from './headerActions'

export const headerReducer = createReducer({
  isVisible: true,
}).handleAction(changeHeaderStatus, (state, action) => ({
  ...state,
  isVisible: action.payload,
}))
