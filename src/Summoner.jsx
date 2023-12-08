import * as React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

const Summoner = () => {
  let { user_Id } = useParams()
  return <div>{user_Id}</div>
}

export default Summoner
