import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {userID,token}=useSelector(state=>state.userData) || {}
  const navigate=useNavigate()

  useEffect(()=>{
    if(!userID && !token){
      navigate('/login')
    }
  },[userID, token])
  return (
    <Layout>
      {userID && token && (
        <>
          <h1>Home page</h1>
        </>
      )}
    </Layout>
  )
}

export default Home