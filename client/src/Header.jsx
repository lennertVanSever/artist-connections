import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GitHubLogo } from './icons/GitHub.svg';


const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.black}; 
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 45px;
  box-sizing: border-box;
  z-index: 2;
  top: 0;
`;

const StyledH1 = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const StyledGithubLogo = styled(GitHubLogo)`
  width: 25px;
  height: 25px;
`;

export default () => ( 
  <StyledHeader>
    <StyledH1>Artist connections</StyledH1>
    <a 
      aria-label="Have a look at the GitHub repository to know exactly how this project was build"
      href="https://github.com/lennertVanSever/artist-connections"
    >
      <StyledGithubLogo />
    </a>
  </StyledHeader>
);
