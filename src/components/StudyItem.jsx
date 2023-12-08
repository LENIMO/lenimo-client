import React from 'react'
import styles from './StudyItem.module.css'
import { supabase } from '../supabaseClient'

const StudyItem = ({ data }) => {
  const dateObject = new Date(data.created_at)
  const publicUrl = supabase.storage
    .from('avatars')
    .getPublicUrl(`${data.profiles.avatar_url}`)
  return (
    <div className={styles.StudyItem}>
      <img
        height='50'
        width='50'
        src={publicUrl.data.publicUrl}
        style={{ borderRadius: '100dvh' }}
      />
      <div className={styles.longInfo}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          {data.user_name}
        </div>
        <div className={styles.fw400} style={{ letterSpacing: '1px' }}>
          {data.profiles.position}
        </div>
      </div>
      <img
        height='50'
        width='50'
        src={`https://cdn.simpleicons.org/${data.subject}/white`}
      />
      <div
        style={{ fontWeight: 700, letterSpacing: '1px' }}
        className={styles.middleInfo}
      >
        {data.subject.toUpperCase()}
      </div>
      <div className={(styles.verticalInfo, styles.shortInfo)}>
        <p className={styles.fw700} style={{ color: '#39e75f' }}>
          {data.goal_time}
        </p>
        <p className={styles.fw400}>목표 시간(분)</p>
      </div>
      <div className={(styles.verticalInfo, styles.shortInfo)}>
        <p className={styles.fw700} style={{ color: '#FF7F7F  ' }}>
          {data.study_time}
        </p>
        <p className={styles.fw400}>공부 시간(분)</p>
      </div>
      <div className={(styles.verticalInfo, styles.shortInfo)}>
        <p
          className={styles.fw700}
          style={
            data.self_evaluation < 2 ? { color: 'gray' } : { color: '#39e75f' }
          }
        >
          {data.self_evaluation}
        </p>
        <p className={styles.fw400}>자기평가</p>
      </div>
      <div>{dateObject.toLocaleString('ko-KR', { timeZone: 'UTC' })}</div>
    </div>
  )
}
export default StudyItem
