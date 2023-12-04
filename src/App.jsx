import './App.css'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import SupabaseAuth from './SupabaseAuth.jsx'
import Account from './Account.jsx'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      {!session ? (
        <div
          style={{
            paddingTop: '33dvh',
            paddingRight: '35dvw',
            paddingLeft: '35dvw',
            minWidth: '500px',
            minHeight: '500px',
          }}
        >
          <SupabaseAuth />
        </div>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}

export default App
