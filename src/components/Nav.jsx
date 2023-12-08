import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineEdit } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { RiTodoLine } from 'react-icons/ri'
import styles from './Nav.module.css'
import { supabase } from '../supabaseClient'

const Nav = ({ session }) => {
  const [user_name, setUser_name] = useState('')
  useEffect(() => {
    async function getProfiles() {
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('user_name')
          .eq('id', session.user.id)

        if (error) throw error
        setUser_name(data[0].user_name)
      } catch (error) {
        console.error('Error fetching profiles:', error.message)
      }
    }

    getProfiles()
  }, [session])
  return (
    <nav className={styles.side_nav}>
      <NavLink
        to='/main_window'
        style={({ isActive }) => {
          return {
            textDecoration: isActive ? 'underline' : '',
            textUnderlineOffset: '2.1px',
            backgroundColor: isActive ? '#363944' : '#282b33',
          }
        }}
      >
        <AiOutlineHome /> 홈
      </NavLink>
      <NavLink
        to='/study'
        style={({ isActive }) => {
          return {
            textDecoration: isActive ? 'underline' : '',
            textUnderlineOffset: '2.1px',
            backgroundColor: isActive ? '#363944' : '#282b33',
          }
        }}
      >
        <AiOutlineEdit /> 내 학습
      </NavLink>
      <NavLink
        to={`/summoner/${user_name}`}
        style={({ isActive }) => {
          return {
            textDecoration: isActive ? 'underline' : '',
            textUnderlineOffset: '2.1px',
            backgroundColor: isActive ? '#363944' : '#282b33',
          }
        }}
      >
        <RiTodoLine /> 나의 기록
      </NavLink>
      <NavLink
        to='/profile'
        style={({ isActive }) => {
          return {
            textDecoration: isActive ? 'underline' : '',
            textUnderlineOffset: '2.1px',
            backgroundColor: isActive ? '#363944' : '#282b33',
          }
        }}
      >
        <IoPersonCircleOutline /> 프로필
      </NavLink>
      {/* <NavLink
        to='/ranking'
        style={({ isActive }) => {
          return {
            textDecoration: isActive ? 'underline' : '',
            textUnderlineOffset: '2.1px',
            backgroundColor: isActive ? '#363944' : '#282b33',
          }
        }}
      >
        <h1 /> 랭킹
      </NavLink> */}
    </nav>
  )
}

export default Nav
