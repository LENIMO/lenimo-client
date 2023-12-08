import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import styles from './Summoner.module.css'
import StudyList from './components/StudyList.jsx'
import { supabase } from './supabaseClient'

const Summoner = (session) => {
  let { user_name } = useParams()
  const [studyRecords, setStudyRecords] = useState([])


  useEffect(() => {
    console.log(user_name)

    async function getStudyRecord() {
      try {
        let { data, error } = await supabase
          .from('StudyRecord')
          .select('*, profiles(user_name, avatar_url, position) ')
            .eq('user_name', user_name)
        console.log(data)
        if (error) throw error
        setStudyRecords(
          data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        )
      } catch (error) {
        console.error('Error fetching study records:', error.message)
      }
    }

    getStudyRecord()

  }, [session])
  return (
    <div className={styles.SummonerContainer}>
      <h1>{user_name}</h1>
      <br />
      <StudyList studyRecords={studyRecords} headText={'최신'} />
    </div>
  )
}

export default Summoner
