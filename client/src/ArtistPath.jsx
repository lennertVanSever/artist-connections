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
  opacity: ${({ opacity }) => opacity};

  @media (orientation: landscape) {
    animation: ${leftAndRight} .5s ease-in-out infinite;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }
`;

const appear = keyframes`
  100% {
    min-width: 300px;
    min-height: 300px;
    border-radius: 0px;
    margin-bottom: 25px;
    margin: 12.5px;
  }
`;

const appearH2 = keyframes`
  100% {
    font-size: 30px;
    line-height: 32px;
  }
`;

const appearH4 = keyframes`
  100% {
    font-size: 20px;
  }
`;

const StyledArtistWrapperAdjusted = styled(StyledArtistWrapper)`
  height: 0;
  width: 0;
  min-width: 0;
  min-height: 0;
  margin: 0;
  animation: ${appear} 1s linear;
  animation-delay: ${({ delay }) => delay}s;
  animation-fill-mode: forwards;
  overflow: hidden;
  border-radius: 50%;
  h2 {
    font-size: 0px;
    line-height: 0px;
    animation: ${appearH2} 1s linear;
    animation-delay: ${({ delay }) => delay}s;
    animation-fill-mode: forwards;
  }
  h4 {
    font-size: 0px;
    animation: ${appearH4} 1s linear;
    animation-delay: ${({ delay }) => delay}s;
    animation-fill-mode: forwards;
  }
`;

export default ({ data }) => (
  <>
    <StyledLoader opacity={data === 'LOADING' ? 1 : 0} />
    {
      Array.isArray(data) && data.map((artistData, index) => ( 
        <StyledArtistWrapperAdjusted delay={index}><Artist data={artistData}/></StyledArtistWrapperAdjusted>
      ))
    }
  </>
)