import React, { useEffect, useState } from 'react'
import { supabase } from '../../src/supabaseClient'

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2dvh',
        marginBottom: '2dvh',
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt='Avatar'
          style={{ height: size, width: size, borderRadius: '100dvh' }}
        />
      ) : (
        <div style={{ height: size, width: size, borderRadius: '100dvh' }} />
      )}
      <div
        style={{
          width: '80px',
          height: '40px',
          backgroundColor: '#282B33',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '80dvh',
        }}
      >
        <label
          htmlFor='single'
          style={{
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {uploading ? '업로드 중...' : '업로드'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
