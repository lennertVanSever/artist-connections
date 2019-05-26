import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ArrowIcon } from './icons/Arrow.svg';
import { ReactComponent as CrossIcon } from './icons/Cross.svg';

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
  line-height: 32px;
  font-weight: bold;
`;

const StyledH4 = styled.h4`
  ${titleStyle}
  font-size: 20px;
  margin-top: 5px;
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

const iconStyle = css`
  width: 16px;
  height: 16px;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  ${iconStyle}
  position: absolute;
  margin: auto;
  @media (orientation: landscape) {
    top: 0;
    bottom: 0;
  }
  @media (orientation: portrait) {
    left: 0px;
    right: 0px;
    transform: rotate(90deg);
  }
  ${({ positionedBegin }) => {
    if (positionedBegin) {
      return css`
        @media (orientation: landscape) {
          left: -21px;
        }
        @media (orientation: portrait) {
          top: -21px;
        }
      `;
    }
    return css`
      @media (orientation: landscape) {
        right: -21px;
      }
      @media (orientation: portrait) {
        bottom: -21px;
      }
    `;
  }};
  ${({ flip }) => {
    if (flip) {
      return css`
        @media (orientation: landscape) {
          transform: rotate(180deg);
        }
        @media (orientation: portrait) {
          transform: rotate(270deg);
        }
      `;
    }
  }}
`;

const StyledCrossIcon = styled(CrossIcon)`
  ${iconStyle}
`;

const spotifyRelatedUrl = (id) => `https://open.spotify.com/artist/${id}/related`;

export default ({ data: { image, name, url, genre, connection1, connection2 }, data, setSelectedArtist, backArrow }) => (
  <StyledWrapper image={image}>
    { connection1 && ( 
      <a href={spotifyRelatedUrl(connection1.source)} target="_blank">
        <StyledArrowIcon
          positionedBegin
          flip={connection1.direction === 'RIGHT'}
        />
      </a>
    )}
    { connection2 && (
      <a href={spotifyRelatedUrl(connection2.source)} target="_blank">
        <StyledArrowIcon flip={connection2.direction === 'RIGHT'} />
      </a>
    )}
    <StyledContent>
      {
        backArrow && (
        <form
          onSubmit={event => {
            event.preventDefault();
            setSelectedArtist({
              ...data,
              confirmed: false,
            });
          }}
        >
          <StyledButton><StyledCrossIcon aria-label="switch back to the artist selection" /></StyledButton>
        </form>
        )
      }
      <StyledH2><StyledAnchor href={url} target="_blank">{name}</StyledAnchor></StyledH2>
      <StyledH4>{genre}</StyledH4>
    </StyledContent>
    <StyledBackground />
  </StyledWrapper>
);
