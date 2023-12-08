import styles from './App.module.css'
import React, { useState, useEffect } from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient'
import SupabaseAuth from './SupabaseAuth.jsx'
import Account from './Account.jsx'
import Study from './Study.jsx'
import Home from './Home.jsx'
import Nav from './components/Nav.jsx'
import Titlebar from './components/Titlebar.jsx'
import Week from './Week.jsx'
import Summoner from './Summoner.jsx'
import Ranking from './components/Ranking.jsx'

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
      <Titlebar />
      <MemoryRouter initialEntries={['/main_window']}>
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
          <div className={styles.container}>
            <Nav />
            <Routes>
              <Route path='/main_window' element={<Home session={session} />} />
              <Route path='/study' element={<Study session={session} />} />
              <Route
                path='/summoner/:user_name'
                element={<Summoner session={session} />}
              />
              <Route path='/week' element={<Week />} />
              <Route
                path='/profile'
                element={<Account key={session.user.id} session={session} />}
              />
              <Route path='/ranking' element={<Ranking session={session} />} />
            </Routes>
          </div>
        )}
      </MemoryRouter>
    </div>
  )
}

export default App
