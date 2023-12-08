import React from 'react'

const StudyItem = ({ data }) => {
  return (
    <div>
      <div>{data.user_name}</div>
      <img
        height='64'
        width='64'
        src={`https://cdn.simpleicons.org/${data.subject}/white`}
      />
      <div>{data.subject}</div>
      <div>{data.goal_time}</div>
      <div>{data.study_time}</div>
      <div>{data.self_evaluation}</div>
      <div>{data.subject}</div>
      <div>{data.goal_time}</div>
      <div>{data.study_time}</div>
      <div>{data.self_evaluation}</div>
    </div>
  )
}

export default StudyItem
