import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import InitialPage from './saratshopsite/InitialPage'
import LoginLayout from './saratshopsite/LoginLayout'
import CheckOutPage from './saratshopsite/CheckoutPage'


const App = () => {
  return (
    <>

      <br />     
    <>
     <Router>
        <Switch>
          <Route exact path='/login' component={LoginLayout} />
          <Route exact path='/checkout' component={CheckOutPage} />
          <Route path='/' component={InitialPage} />
        </Switch>
      </Router>
    </>




    </>
  )
}

export default App
