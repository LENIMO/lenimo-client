import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './components/Avatar.jsx'
import styles from './Account.module.css'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [position, setPosition] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`user_name, position, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.user_name)
          setPosition(data.position)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      user_name,
      position,
      avatar_url,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <div className={styles.accountContainer}>
      <form onSubmit={updateProfile} className={styles.form}>
        <Avatar
          url={avatar_url}
          size={200}
          onUpload={(event, url) => {
            updateProfile(event, url)
          }}
        />

        <div style={{ width: '100%' }}>
          <label htmlFor='email' style={{ color: '#fff' }}>
            이메일
          </label>
          <input
            id='email'
            type='text'
            value={session.user.email}
            disabled
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div style={{ width: '100%' }}>
          <label htmlFor='username' style={{ color: '#fff' }}>
            {`이름(초기 값 랜덤, 중복불가)`}
          </label>
          <input
            id='username'
            type='text'
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div style={{ width: '100%' }}>
          <label htmlFor='position' style={{ color: '#fff' }}>
            포지션
          </label>
          <input
            id='position'
            type='text'
            value={position || ''}
            onChange={(e) => setPosition(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>

        <div
          style={{
            marginTop: '2dvh',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <button
              type='submit'
              disabled={loading}
              style={{
                border: 0,
                width: '80px',
                height: '40px',
                backgroundColor: '#f9be26',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '80dvh',
              }}
            >
              {loading ? '업데이트 중 ...' : '업데이트'}
            </button>
          </div>

          <div>
            <button
              type='button'
              onClick={() => supabase.auth.signOut()}
              style={{
                border: 0,
                width: '80px',
                height: '40px',
                backgroundColor: '#282B33',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '80dvh',
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
