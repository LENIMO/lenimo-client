import React from 'react'
import styles from './Titlebar.module.css'
const { ipcRenderer } = window.require('electron')

const Titlebar = () => {
  const handleClickClose = () => {
    ipcRenderer.send('trayApp')
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.logoText}>LENIMO👀</p>
      </div>
      <div className={styles.right}>
        <div className={styles.closeBtn} onClick={handleClickClose}>
          닫기
        </div>
      </div>
    </div>
  )
}

export default Titlebar
