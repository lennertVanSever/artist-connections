import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from './icons/Search.svg';

const StyledArticle = styled.article`
  background-color: ${({ theme }) => theme.darkGray};;
  max-width: 100%;
  width: 300px;
  height: 300px;
  max-height: calc(50vh - 40px);
`;

const StyledLabel = styled.label`
  height: 16px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 2px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 16px;
  height: 16px;
`;

const StyledHr = styled.hr`
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  margin: 0;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
`;

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => theme.white};
  background-color: transparent;
  font-size: 20px;
  line-height: 27px;
  margin-left: 7px;
  width: calc(100% - 5px);
  padding: 0;
  -webkit-appearance: textfield;
  &:focus {
    outline: none;
    + ${StyledHr} {
      background-color: ${({ theme }) => theme.primary};
    }
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export default () => (
  <StyledArticle>
    <StyledInputWrapper>
      <StyledLabel><StyledSearchIcon/></StyledLabel>
      <StyledInput placeholder="Search your first artist" type="search" />
      <StyledHr/>
    </StyledInputWrapper>
  </StyledArticle>
);