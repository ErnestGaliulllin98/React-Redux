import {call, put, takeEvery} from 'redux-saga/effects'
import {FETCH_POST, REQUEST_POST} from '../redux/types'
import {hideLoader, showAlert, showLoader} from './actions'

export function* sagaWatcher() {
  // console.log('Hello Sagas!')
  yield takeEvery(REQUEST_POST, sagaWorker)
}

function* sagaWorker() {
  try {
    yield put(showLoader())
    const payload = yield call(fetchPosts)
    yield put({type: FETCH_POST, payload})
    yield put(hideLoader())
  } catch (error) {
    yield put(hideLoader())
    yield put(showAlert('Что-то пошло не так'))
  }
}

async function fetchPosts() {
  const response = await fetch(
    'httfps://jsonplaceholder.typicode.com/posts?_limit=5'
  )
  return await response.json()
}
