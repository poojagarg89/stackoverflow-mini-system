import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import data from '../../data.json';

export default function Questions() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [pageDetails, setPageDetails] = useState({
    offset: 0,
    perPage: 15,
    currentPage: 1,
  });
  const [questionData, setQuestionData] = useState(undefined);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('questionDetails'));
    if (localData && localData.length > 0) {
      setQuestionData(localData);
    } else {
      setQuestionData(data);
    }
  }, []);

  const onAskBtnClick = () => {
    if (loggedInUser) {
      navigate('/ask-questions');
    } else {
      navigate('/user-login-error');
    }
  };

  const handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * pageDetails.perPage;

    setPageDetails({
      currentPage: selectedPage,
      offset: offset,
      perPage: pageDetails.perPage,
    });
  };

  const onTitleClick = useCallback(
    id => {
      navigate(`/questions/${id}`);
      window.location.reload();
    },
    [navigate],
  );

  const renderData = useCallback(() => {
    const sliceData = questionData?.slice(pageDetails?.offset, parseInt(pageDetails?.offset + pageDetails?.perPage));
    return (
      sliceData &&
      sliceData.length > 0 &&
      sliceData.map((item, key) => {
        return (
          <div className="question-content" key={key}>
            <div className="vote-answer-section">
              <div>
                {item?.votes} <span className="votes-text">votes</span>
              </div>
              <div>
                {item?.answers} <span className="answer-text">answers</span>
              </div>
              <div>
                {item?.views} <span className="views-text">views</span>
              </div>
            </div>
            <div className="question-section">
              <div className="question-title" onClick={() => onTitleClick(item?.id)}>
                {item?.title}
              </div>
              <div dangerouslySetInnerHTML={{ __html: item?.description }} />
            </div>
          </div>
        );
      })
    );
  }, [onTitleClick, pageDetails?.offset, pageDetails?.perPage, questionData]);

  return (
    <div className="question-main">
      <div className="question-header">
        <h4 className="all-question-text">All Questions</h4>
        <button className="ask-question-btn" onClick={onAskBtnClick}>
          Ask Question
        </button>
      </div>
      {renderData()}
      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        pageCount={Math.ceil(questionData?.length / pageDetails.perPage)}
      />
    </div>
  );
}
