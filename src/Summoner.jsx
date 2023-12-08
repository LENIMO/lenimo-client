import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import styles from './Summoner.module.css'
import StudyList from './components/StudyList.jsx'
import { supabase } from './supabaseClient'

const Summoner = (session) => {
  let { user_Id } = useParams()
  const [studyRecords, setStudyRecords] = useState([])

  useEffect(() => {
    async function getStudyRecord() {
      try {
        let { data, error } = await supabase
          .from('StudyRecord')
          .select('*')
          .eq('user_name', user_Id)
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
      {user_Id}
      <br />
      <StudyList studyRecords={studyRecords} headText={'최신'} />
    </div>
  )
}

export default Summoner
