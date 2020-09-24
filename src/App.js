import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import workSans from './fonts/WorkSans-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Work Sans';
    src: url(${workSans}) format('truetype');
    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 10px;
  }

  body {
    font-family: 'Work Sans', Arial, Helvetica, sans-serif;
    background: #3E5151;  
    background: -webkit-linear-gradient(to top, #DECBA4, #3E5151); 
    background: linear-gradient(to top, #DECBA4, #3E5151);
    color: #111; 
  }
`;
const sharedStyles = css`
  background-color: #ccc;
  height: 4rem;
  border-radius: 0.5rem;
  border: 1px solid #dcdcdc;
  margin: 1rem 0 2rem 0;
  padding: 2rem;
  font-family: 'Work Sans', Arial, Helvetica, sans-serif;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 2rem;
`;

const StyledForm = styled.form`
  width: min(70rem, 100%);
  padding: 4rem;
  background-color: #eee;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.4rem;
  h2 {
    font-size: 2.4rem;
    margin-bottom: 1.4rem;
  }
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 1.8rem;
  ${sharedStyles}
`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 10rem;
  font-size: 1.8rem;
  resize: none;
  ${sharedStyles}
`;

const StyledButton = styled.button`
  height: 4rem;
  display: block;
  background-color: #3e5151;
  color: #fff;
  padding: 0 2rem;
  font-size: 1.8rem;
  font-family: 'Work Sans', Arial, Helvetica, sans-serif;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 300ms ease-out;
  :hover {
    background-color: #4b6960;
  }
  :focus {
    outline: none;
  }
`;

const StyledFieldSet = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 2rem 0;

  legend {
    padding: 0 1rem;
  }

  label {
    padding-right: 2rem;
  }

  input {
    margin-right: 1rem;
  }
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin-bottom: 4rem;
`;

//  INITIAL STATE
const initialState = {
  name: '',
  email: '',
  gender: '',
  message: '',
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    //    BASIC ERROR CHECKING
    for (let key in state) {
      if (state[key] === '') {
        setError(`You must provide the ${key}`);
        return;
      }
    }

    //  VALIDATE EMAIL FORMAT
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = regex.test(state.email);

    if (!test) {
      setError('Please enter correctly formatted email');
      return;
    }

    setError('');
    console.log('submitted');
  };

  const handleInput = (e) => {
    const inputName = e.target.name;
    const val = e.target.value;

    setState((prevState) => ({ ...prevState, [inputName]: val }));
  };

  return (
    <>
      <GlobalStyle />
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Contact Form</h2>
          <label htmlFor='name'>Name</label>
          <StyledInput
            type='text'
            name='name'
            value={state.name}
            onChange={handleInput}
          />

          <label htmlFor='email'>Email</label>
          <StyledInput
            type='email'
            name='email'
            value={state.email}
            onChange={handleInput}
          />

          <StyledFieldSet>
            <legend>Gender</legend>
            <label>
              <input
                type='radio'
                value='female'
                name='gender'
                checked={state.gender === 'female'}
                onChange={handleInput}
              />
              Female
            </label>
            <label>
              <input
                type='radio'
                value='male'
                name='gender'
                checked={state.gender === 'male'}
                onChange={handleInput}
              />
              Male
            </label>
          </StyledFieldSet>

          <label htmlFor='message'>Message</label>
          <StyledTextArea
            name='message'
            value={state.message}
            onChange={handleInput}
          />
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}

          <StyledButton type='submit'>Send Message</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default App;
