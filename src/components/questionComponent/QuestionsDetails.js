import React, { useState } from 'react';
import upArrow from '../../assets/upArrow.png';
import downArrow from '../../assets/downArrow.png';

export default function QuestionsDetails() {
  const path = window.location.pathname;
  const splitId = path.split('/')[2];

  const questionData = JSON.parse(localStorage.getItem('questionDetails'));
  let findQuestionData = questionData?.find(item => item?.id === splitId);

  const [votes, setVotes] = useState(0);
  const onIconClick = val => {
    if (val === 'up') {
      setVotes(votes + 1);
    } else {
      setVotes(votes < 0 ? -1 : votes - 1);
    }
  };
  findQuestionData = { ...findQuestionData, votes };

  const updatedQuestionData = questionData?.map(item => {
    if (findQuestionData?.id === item?.id) {
      return {
        ...item,
        votes: votes,
      };
    } else {
      return {
        ...item,
      };
    }
  });

  localStorage.setItem('questionDetails', JSON.stringify(updatedQuestionData));

  return (
    <div>
      <div className="question-details-content">
        <div className="vote-answer-section">
          <div>
            <img src={upArrow} alt="up-arrow" className="up-down-icon" onClick={() => onIconClick('up')} />
          </div>
          <div>{votes}</div>
          <div>
            <img src={downArrow} alt="down-arrow" className="up-down-icon" onClick={() => onIconClick('down')} />
          </div>
        </div>
        <div className="question-section">
          <div className="question-title">{findQuestionData?.title}</div>
          <div dangerouslySetInnerHTML={{ __html: findQuestionData?.description }} />
        </div>
      </div>
    </div>
  );
}
