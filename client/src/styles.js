import styled from 'styled-components';

export const StyledArtistWrapper = styled.div`
  max-width: 300px;
  max-height: 300px;
  z-index: 1;

  @media (orientation: portrait) {
    width: calc(100vw - 30px);
    height: calc(50% - 25px);
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
  @media (orientation: landscape) {
    height: 100%;
    width: calc(50vw - 27.5px);
    margin: 0;
    margin-right: 25px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
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