import React, { useState, useMemo, useCallback } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function AskQuestionComp() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();

  const onInputChange = useCallback(e => {
    const { value } = e.target;
    setQuestionTitle(value);
  }, []);

  const handleChange = data => {
    setEditorState(data);
  };

  let htmlData = useMemo(() => draftToHtml(convertToRaw(editorState.getCurrentContent())), [editorState]);

  const onSubmitClick = () => {
    let data = {
      id: uuid(),
      views: 0,
      answers: 0,
      votes: 0,
      title: questionTitle,
      description: htmlData,
    };
    let oldData = JSON.parse(localStorage.getItem('questionDetails'));
    if (oldData?.length > 0) {
      localStorage.setItem('questionDetails', JSON.stringify([...oldData, data]));
    } else {
      localStorage.setItem('questionDetails', JSON.stringify([data]));
    }
    alert('Question saved successfully.');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="ask-question-main">
      <div className="login-register-content">
        <>
          <h4 className="email-text">Title</h4>
          <input
            type="text"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            className="email-input"
            required
            name="title"
            onChange={onInputChange}
          />
          <h4 className="email-text">Body</h4>
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            wrapperStyle={{ width: 800, border: '1px solid black', padding: '10px' }}
            editorState={editorState}
            onEditorStateChange={handleChange}
          />
        </>
        <div>
          <button className="login-register-btn" onClick={onSubmitClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
