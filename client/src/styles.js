import styled from 'styled-components';

export const StyledArtistWrapper = styled.div`
  width: calc(100vw - 30px);
  max-width: 300px;
  height: calc(50vh - 37.5px);
  max-height: 300px;
  margin: 15px;
  margin-top: 0px;
  z-index: 1;
  &:last-of-type {
    margin-bottom: 5px;
  }
  @media (orientation: landscape) {
    height: calc(100vh - 60px);
    width: calc(50vw - 23px);
    margin: 0;
    margin-right: 15px;
    &:first-of-type {
      margin-left: 15px;
    }
  }
  /*
  max-width: 100vh;
  min-width: 300px;
  min-height: 300px;
  height: 300px;
  width: 300px;
  max-height: calc(50vh - 40px);
  z-index: 1;
  margin-bottom: 25px;
  @media (orientation: landscape) {
    max-height: calc(100vh - 55px);
    margin-bottom: 0px;
    margin-right: 25px;
  }
  &:last-of-type {
    margin-bottom: 0px !important;
    margin-right: 0px !important;
  }
  */
`;