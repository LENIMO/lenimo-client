import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import StudyList from './components/StudyList.jsx'

const Home = ({ session }) => {
  const [studyRecords, setStudyRecords] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    async function getProfiles() {
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, position')
        if (error) throw error
        setProfiles(data)
      } catch (error) {
        console.error('Error fetching profiles:', error.message)
      }
    }

    async function getStudyRecord() {
      try {
        let { data, error } = await supabase.from('StudyRecord').select('*')
        if (error) throw error
        setStudyRecords(
          data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        )
      } catch (error) {
        console.error('Error fetching study records:', error.message)
      }
    }

    getProfiles()
    getStudyRecord()
  }, [session])

  return (
    <div>
      <StudyList studyRecords={studyRecords} headText={'최신'} />
    </div>
  )
}

export default Home