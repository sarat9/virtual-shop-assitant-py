/*
  http://bit.ly/2DTXGpe - `@babel/polyfill` has been deprecated.
  If you need to polyfill certain JS features, uncomment the two imports below.
  Be sure to adjust the `browserslist` field in your `package.json` file.
*/
// import 'core-js/stable'
// import 'regenerator-runtime/runtime' // Needed to polyfill async / await.

// Import our top-level sass file.
import './styles/styles.scss'
import rootReducer from './redux/reducers/reducers'
// Import React.
import React from 'react'
import ReactDOM from 'react-dom'

// Import our top-level component.
import App from 'components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'



// Top-level classes on the body. Feel free to remove / change.
// document.body.className = 'bg-black-80 fw4 white-80'
const store = createStore(rootReducer)

// Mount our app.
ReactDOM.render(
  (<Provider store={store}><App /></Provider>),
  document.querySelector('#app')
)
