import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  height: 100%;
  width: 2px;
  border: none;
  background-color: ${({ theme }) => theme.white};;
  margin: 0;
  @media (orientation: landscape) {
    height: 2px;
    width: 100%;
  }
`;

const StyledWrapper = styled.div`
  height: 25px;
  @media (orientation: landscape) {
    width: 25px;
  }
`;

export default () => (
  <StyledWrapper>
    <StyledHr />
  </StyledWrapper>
)