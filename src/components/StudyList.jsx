import React from 'react'
import StudyItem from './StudyItem.jsx'
import styles from './StudyList.module.css'

function StudyList({ studyRecords, headText, session }) {
  return (
    <div className={styles.StudyListWrap}>
      <h3>{headText}</h3>
      {studyRecords.map((data) => (
        <StudyItem data={data} session={session} />
      ))}
    </div>
  )
}

export default StudyList
