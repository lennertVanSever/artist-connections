import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset'
import Header from './Header';
import ArtistInput from './ArtistInput';
import Connector from './Connector';

const theme = {
  white: '#fff',
  lightGray: '#6A6A6A',
  darkGray: '#212121',
  black: '#191414',
  primary: '#1DB954',
}

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.black};;
  min-height: 100vh;
  width: 100vw;
  font-family: helvetica;
  * {
    box-sizing: border-box;
  }
`;

const StyledArtistSuperWrapper = styled.div`
  padding: 0px 10px;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
`;

const StyledArtistWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (orientation: landscape) {
    flex-direction: row;
    justify-content: center;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledMain>
        <Reset />
        <Header />
        <StyledArtistSuperWrapper>
          <StyledArtistWrapper>
            <ArtistInput />
            <Connector />
            <ArtistInput />
          </StyledArtistWrapper>
        </StyledArtistSuperWrapper>
      </StyledMain>
    </ThemeProvider>
  );
}

export default App;
