import React, { useState, useEffect } from 'react'
import styles from './Study.module.css'
import { supabase } from './supabaseClient'

const Study = ({ session }) => {
  const [username, setUsername] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [formData, setFormData] = useState({
    subject: '',
    goalTime: 0,
    studyTime: 0,
    summaryNote: '',
    selfEvaluation: 0,
    learningMaterialLink: '',
  })

  useEffect(() => {
    const { user } = session

    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          'https://port-0-techskill-api-1gksli2alps6lg6u.sel4.cloudtype.app/api/techstacks'
        )
        const data = await response.json()
        setSubjects(data)
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }

    const getUserName = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`user_name`)
        .eq('id', user.id)
        .single()
      setUsername(data.username)
      return data
    }

    fetchSubjects()
    getUserName()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsloading(true)

    const { user } = await session

    const { data, error } = await supabase
      .from('StudyRecord')
      .insert([
        {
          user_id: user.id,
          user_name: username,
          subject: formData.subject,
          goal_time: formData.goalTime,
          study_time: formData.studyTime,
          study_notes: formData.summaryNote,
          self_evaluation: Number(formData.selfEvaluation),
        },
      ])
      .select()

    if (error === null) {
      alert('제출 완료!')
      setIsloading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.StudyForm}>
        <div className={styles.subjectInput}>
          <label className={styles.inputs}>
            <h3>과목:</h3>
            <select
              className={styles.inputStyle}
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option key='default' value='default'>
                과목 선택
              </option>
              {subjects.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                )
              })}
            </select>
          </label>
        </div>

        <div className={styles.goalTimeInput}>
          <label className={styles.inputs}>
            <h3>목표 시간(분):</h3>
            <input
              className={styles.inputStyle}
              type='number'
              name='goalTime'
              value={formData['goalTime']}
              onChange={handleChange}
              placeholder='분 예시) 2시간 => 120분'
              required
            />
          </label>
        </div>

        <div className={styles.studyTimeInput}>
          <label className={styles.inputs}>
            <h3>소요 시간(분):</h3>
            <input
              className={styles.inputStyle}
              type='number'
              name='studyTime'
              value={formData['studyTime']}
              onChange={handleChange}
              placeholder='분 예시) 2시간 => 120분'
              required
            />
          </label>
        </div>

        <div className={styles.summaryNoteInput}>
          <label className={styles.inputs}>
            <h3>정리 노트:</h3>
            <textarea
              className={styles.inputStyle}
              style={{
                width: '100%',
                height: '100%',
              }}
              name='summaryNote'
              value={formData.summaryNote}
              onChange={handleChange}
              placeholder='공부한 내용을 정리 해보세요!'
            ></textarea>
          </label>
        </div>

        <div className={styles.selfEvaluationInput}>
          <label className={styles.inputs}>
            <h3>자기 평가:</h3>
            <input
              type='range'
              name='selfEvaluation'
              min='0'
              max='5'
              value={formData.selfEvaluation}
              onChange={handleChange}
              required
            />
            <div className={styles.selfEvaluationText}>
              <span>Bad</span>
              <span>Normal</span>
              <span>Good</span>
            </div>
            {formData.selfEvaluation}
          </label>
        </div>

        <div className={styles.learningMaterialLinkInput}>
          <label className={styles.inputs}>
            <h3>학습 자료 링크:</h3>
            <input
              className={styles.inputStyle}
              type='text'
              name='learningMaterialLink'
              value={formData.learningMaterialLink}
              onChange={handleChange}
              placeholder='참고한 링크를 작성해보세요.'
            />
          </label>
        </div>

        <div className={styles.submitBtn}>
          <button
            type='submit'
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              backgroundColor: '#f9be26',
              borderRadius: '1dvh',
              fontSize: '1rem',
            }}
          >
            {isloading ? '로딩 중' : '제출'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Study
