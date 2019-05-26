import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  height: 100%;
  width: 2px;
  border: none;
  background-color: ${({ theme }) => theme.white};;
  margin: auto;
  position: absolute;
  bottom: 0;
  top: 0;
  margin: auto;
  @media (min-width: 700px) {
    height: 2px;
    width: 100%;
  }
`;

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 0;
  height: calc(100% - 27px);
  @media (min-width: 700px) {
    width: calc(100% - 27px);
  }
`;

export default () => (
  <StyledWrapper>

  </StyledWrapper>
)