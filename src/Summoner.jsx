import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import styles from './Summoner.module.css'
import StudyList from './components/StudyList.jsx'
import { supabase } from './supabaseClient'
import UserCard from './components/UserCard.jsx'

const Summoner = (session) => {
  let { user_name } = useParams()
  const [user, setUser] = useState({})
  const [studyRecords, setStudyRecords] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('user_name', user_name)
        .single()
      console.log(data)
      setUser(data)
    }

    async function getStudyRecord() {
      try {
        let { data, error } = await supabase
          .from('StudyRecord')
          .select(
            '*, profiles(user_name, avatar_url, position, total_study_time) '
          )
          .eq('user_name', user_name)

        if (error) throw error
        setStudyRecords(
          data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        )
      } catch (error) {
        console.error('Error fetching study records:', error.message)
      }
    }

    getUser()
    getStudyRecord()
  }, [session])
  return (
    <div className={styles.SummonerContainer}>
      <UserCard user={user} />
      <StudyList
        studyRecords={studyRecords}
        headText={'최신'}
        session={session}
      />
    </div>
  )
}

export default Summoner
