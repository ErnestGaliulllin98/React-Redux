import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {sagaWatcher} from './redux/sagas'
import {rootReducer} from './redux/rootReducer'
import {forbiddenWordsMiddleware} from './redux/middleware'
import App from './App'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, forbiddenWordsMiddleware, sagaMiddleware)
  )
)

sagaMiddleware.run(sagaWatcher)
const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
