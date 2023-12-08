// React 컴포넌트에서의 GET 요청 예시

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RankingPage = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get('https://xxnqhzsxzmmhagqmkfuc.supabase.co/');
        setRankingData(response.data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <div>
      <h1>Study Time Ranking</h1>
      <ol>
        {rankingData.map((user, index) => (
          <li key={user.user_id}>
            <span>{index + 1}. {user.user_name}</span>
            <span>Study Time: {user.study_time}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingPage;
