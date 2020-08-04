
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkOutProduct } from './../../redux/actions/actions'

function LoginLayout () {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.vehicle)

  console.log(counter)

  return (
    <div className='Login-page'>
      <p>Login</p>{counter}
    </div>
  )
}

export default LoginLayout