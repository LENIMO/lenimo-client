import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import StudyList from './components/StudyList.jsx'
import styles from './Home.module.css'

const Home = ({ session }) => {
  const [studyRecords, setStudyRecords] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    async function getProfiles() {
      try {
        let { data, error } = await supabase.from('profiles').select('*')
        if (error) throw error
        setProfiles(
          data.sort((a, b) => b.total_study_time - a.total_study_time)
        )
      } catch (error) {
        console.error('Error fetching profiles:', error.message)
      }
    }

    async function getStudyRecord() {
      try {
        let { data, error } = await supabase
          .from('StudyRecord')
          .select('*, profiles(user_name, avatar_url, position) ')
        if (error) throw error
        setStudyRecords(
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        )
      } catch (error) {
        console.error('Error fetching study records:', error.message)
      }
    }

    getProfiles()
    getStudyRecord()
    console.log('dd')
    console.log(profiles)
  }, [session])

  return (
    <div className={styles.HomeContainer}>
      <h3
        style={{
          fontWeight: 700,
          color: '#fff',
        }}
      >
        랭킹
      </h3>
      <div>
        {profiles.map((data, index) => {
          const publicUrl = supabase.storage
            .from('avatars')
            .getPublicUrl(`${data.avatar_url}`)
          return (
            <Link
              className={styles.RankingItem}
              to={`/summoner/${data.user_name}`}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2 style={{ width: '3dvw' }}>{index + 1 + '등'}</h2>
              <img
                height='50'
                width='50'
                src={publicUrl.data.publicUrl}
                style={{ borderRadius: '100dvh' }}
              />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                }}
              >
                <h1 style={{ fontSize: '1.4rem' }}>{data.user_name}</h1>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <h2 style={{ fontSize: '1.4em' }}>{data.position}</h2>
                  <p
                    style={{
                      marginRight: '0.5dvw',
                      marginLeft: '0.5dvw',
                      textAlign: 'center',
                    }}
                  >
                    {' & '}
                  </p>
                  <h2 style={{ fontSize: '1.4rem' }}>
                    {parseInt(data.total_study_time / 60) + '시간 '}
                    {parseInt(data.total_study_time % 60) + '분'}
                  </h2>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <StudyList studyRecords={studyRecords} headText={'최신'} />
    </div>
  )
}

export default Home
