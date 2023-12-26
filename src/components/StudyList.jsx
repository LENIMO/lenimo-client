import React from 'react'
import StudyItem from './StudyItem.jsx'
import styles from './StudyList.module.css'

function StudyList({ studyRecords, headText, session }) {
  console.log(studyRecords)
  return (
    <div className={styles.StudyListWrap}>
      <h3 className={styles.headText}>{headText}</h3>
      {studyRecords.map((data) => (
        <StudyItem key={data.study_id} data={data} session={session} />
      ))}
    </div>
  )
}

export default StudyList
