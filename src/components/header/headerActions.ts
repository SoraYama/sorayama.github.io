import { createStandardAction } from 'typesafe-actions'

export const changeHeaderStatus = createStandardAction('CHANGE_HEADER_STATUS')<
  boolean
>()
