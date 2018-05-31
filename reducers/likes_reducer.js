import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types'
import { REHYDRATE } from 'redux-persist/constants'
import uniqBy from 'lodash/uniqBy'

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_JOB:
      return uniqBy([
        action.payload, ...state
      ], 'jobkey')
    case CLEAR_LIKED_JOBS:
      return []
    case REHYDRATE:
      return action.payload.likedJobs || []
    default:
      return state
  }
}