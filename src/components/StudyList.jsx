import React from 'react'
import StudyItem from './StudyItem.jsx'
import styles from './StudyList.module.css'

function StudyList({ studyRecords, headText }) {
  return (
    <div className={styles.StudyListWrap}>
      <h3>{headText}</h3>
      {studyRecords.map((data) => (
        <StudyItem data={data} key={data.study_id} />
      ))}
    </div>
  )
}

export default StudyList
