import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as BackIcon } from './icons/Back.svg';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${({ image }) => image});
  background-color: white;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  z-index: 1;
`;

const titleStyle = css`
  color: ${({theme}) => theme.white};
  text-align: center;
  margin: 0px 10px;
`

const StyledH2 = styled.h2`
  ${titleStyle}
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;
`;

const StyledH4 = styled.h4`
  ${titleStyle}
  font-size: 20px;
`;

const StyledBackground = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0.3;
  height: 100%;
  width: 100%;
`;

const StyledAnchor = styled.a`
  color: white;
  text-decoration: none;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 16px;
  height: 16px;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;

const StyledBackIcon = styled(BackIcon)`
  width: 16px;
  height: 16px;
`;

const Artist = ({ data: { image, name, url, genre }, setSelectedArtist }) => (
  <StyledWrapper image={image}>
    <StyledContent>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log('submitted');
          setSelectedArtist(null);
        }}
      >
        <StyledButton><StyledBackIcon /></StyledButton>
      </form>
      <StyledH2><StyledAnchor href={url}>{name}</StyledAnchor></StyledH2>
      <StyledH4>{genre}</StyledH4>
    </StyledContent>
    <StyledBackground />
  </StyledWrapper>
);

export default Artist;