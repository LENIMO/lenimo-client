import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import './UserCard.css'

const UserCard = ({ user }) => {
  const publicUrl = supabase.storage
    .from('avatars')
    .getPublicUrl(`${user.avatar_url}`)

  console.log(user)
  return (
    <div className='userCard'>
      <div className='userCardInnerWrap'>
        <img className='profileImg' src={publicUrl.data.publicUrl}></img>
        <div className='infoAndTimeWrap'>
          <section className='infos'>
            <h1 className='nameHeadText'>{user.user_name}</h1>
            <h3 className='positionText'>{user.position}</h3>
          </section>
          <section className='times'>
            <div>
              <p className='timeHeadText'>총합 공부 시간</p>
              <p className='timeText'>
                {parseInt(user.total_study_time / 60) + '시간 '}
                {parseInt(user.total_study_time % 60) + '분 '}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default UserCard
