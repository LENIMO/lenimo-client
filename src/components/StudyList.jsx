import React from 'react'
import StudyItem from './StudyItem.jsx'

function StudyList({ studyRecords, headText }) {
  return (
    <div>
      <h3>{headText}</h3>
      {studyRecords.map((data) => (
        <StudyItem data={data} key={data.study_id} />
      ))}
    </div>
  )
}

export default StudyList
