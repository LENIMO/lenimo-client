import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function SupabaseAuth() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            fonts: {
              bodyFontFamily: `Pretendard`,
              buttonFontFamily: `Pretendard `,
              inputFontFamily: `Pretendard `,
              labelFontFamily: `Pretendard`,
            },
            colors: {
              brand: '#F9BE26',
              brandAccent: '#E1AB1E',
            },
          },
        },
      }}
      providers={[]}
      theme='dark'
      localization={{
        variables: {
          sign_in: {
            email_label: '이메일',
            email_input_placeholder: 'Email',
            password_label: '비밀번호',
            password_input_placeholder: 'Password',
            button_label: '로그인',
            loading_button_label: '로그인 중',
            link_text: '계정이 이미 있으신가요?',
          },
          sign_up: {
            email_label: '이메일',
            email_input_placeholder: 'Email',
            password_label: '비밀번호',
            password_input_placeholder: 'Password',
            button_label: '회원가입',
            loading_button_label: '회원가입 중',
            link_text: '계정이 없으신가요?',
          },
          forgotten_password: {
            email_label: '이메일',
            email_input_placeholder: 'Email',
            password_label: '비밀번호',
            password_input_placeholder: 'Password',
            button_label: '비밀번호 초기화 메일 전송',
            loading_button_label: '비밀번호 초기화 메일 전송 중',
            link_text: '비밀번호가 기억나지 않나요?',
            confirmation_text: '이메일을 확인 해주세요.',
          },
        },
      }}
    />
  )
}
