import React from 'react'
import { Navigate } from 'react-router-dom'

function BaseElement() {
  return (
    <Navigate to='/dashboard' />
  )
}

export default BaseElement