import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GitHubLogo } from './icons/GitHub.svg';


const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 45px;
  box-sizing: border-box;
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
    <a href="https://github.com/lennertVanSever/artist-connections">
      <StyledGithubLogo />
    </a>
  </StyledHeader>
);
