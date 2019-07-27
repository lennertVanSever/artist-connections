import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Artist from './Artist';
import { StyledArtistWrapper } from './styles';


const upAndDown = keyframes`
  0% {
    top: -14px;
  }
  50% {
    top: 14px;
  }
  100% {
    top: -14px;
  }
`;

const leftAndRight = keyframes`
  0% {
    left: -14px;
  }
  50% {
    left: 14px;
  }
  100% {
    left: -14px;
  }
`;

const StyledLoader = styled.div`
  position: absolute;
  bottom: 0px;
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  margin-left: 1px;
  transition: opacity 0.5s;
  animation: ${upAndDown} .5s ease-in-out infinite;

  @media (min-width: 700px) {
    animation: ${leftAndRight} .5s ease-in-out infinite;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }
`;


const ArtistWrapper = ({ children, index }) => {
  const [display, setDisplay] = useState('none');
  console.log(index);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay('inline');
    }, index * 150);
    return () => {
      clearTimeout(timer)
    }
  }, []);
  const StyledArtistWrapperAdjusted = styled(StyledArtistWrapper)`
    display: ${display};
  `;
  return (
    <StyledArtistWrapperAdjusted shouldBeDisplayed>
      {children}
    </StyledArtistWrapperAdjusted>
  )
}

export default ({ data }) => (
  <>
    { data === 'LOADING' && <StyledLoader /> }
    {
      Array.isArray(data) && data.map((artistData, index) => ( 
        <ArtistWrapper
          key={artistData.id}
          index={index}
        >
          <Artist data={artistData}/>
        </ArtistWrapper>
      ))
    }
  </>
)