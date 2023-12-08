import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import StudyList from './StudyList.jsx'

const Ranking = ({ session }) => {
  const [studyRecords, setStudyRecords] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    async function getProfiles() {
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('id, user_name, avatar_url, position')
        if (error) throw error
        console.log(data)
        setProfiles(data)
      } catch (error) {
        console.error('Error fetching profiles:', error.message)
      }
    }

    async function getStudyRecord() {
      try {
        let obj = {}
        const userArr = []
        let { data, error } = await supabase
          .from('StudyRecord')
          .select('*, profiles(user_name, avatar_url, position) ')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          userArr.push(data[i])
        }

        userArr.sort((a, b) => b.study_time - a.study_time)

        console.log(userArr)

        if (error) throw error
        setStudyRecords(userArr)
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

export default Ranking
