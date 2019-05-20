import styled from 'styled-components';

export const StyledArtistWrapper = styled.div`
  max-width: 100vh;
  min-width: 300px;
  min-height: 300px;
  height: 300px;
  width: 300px;
  max-height: calc(50vh - 40px);
  z-index: 1;
  margin: 12.5px;
  @media (orientation: landscape) {
    max-height: calc(100vh - 55px);
  }
`;