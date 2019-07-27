import styled from 'styled-components';

export const StyledArtistWrapper = styled.div`
  width: 300px;
  height: 300px;
  z-index: 1;
  @media (max-width: 700px) {
    max-width: calc(100vw - 30px);
    margin: 25px 15px;
    margin-top: 0px;
    &:last-of-type {
      margin-bottom: 5px;
    }
    @media (min-height: 700px) {
      margin: 25px;
      margin-top: 0px;
    }
  }
  @media (min-width: 700px) {
    margin: 0;
    margin-right: 25px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
  }
`;