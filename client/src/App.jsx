import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset'
import Header from './Header';
import Artists from './Artists';

const theme = {
  white: '#fff',
  lightGray: '#6A6A6A',
  darkGray: '#212121',
  black: '#191414',
  primary: '#1DB954',
}

const StyledMain = styled.main`
  height: 100%;
  width: 100%;
  font-family: helvetica;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
  }
  *::selection {
    color: ${({ theme }) => theme.white}; 
    background: ${({ theme }) => theme.primary};
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <StyledMain>
      <Reset />
      <Header />
      <Artists />
    </StyledMain>
  </ThemeProvider>
);

export default App;
