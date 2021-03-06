import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types'
import fakeData from './fakeData'

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
}

const buildJobsQuery = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
  return `http://api.indeed.com/ads/apisearch?${query}`
}

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await reverseGeocode(region)
    const url = buildJobsQuery(zip)
    let { data } = await axios.get(url)
    console.log(data)
    dispatch({ type: FETCH_JOBS, payload: fakeData(region) })
    callback()
  } catch (err) {
    console.error(err)
  }
}

export const likeJob = job => {
  return {
    payload: job,
    type: LIKE_JOB
  }
}

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS }
}