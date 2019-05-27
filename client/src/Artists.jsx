import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtistInput from './ArtistInput';
import ArtistPath from './ArtistPath';

const StyledSuperWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledWrapper = styled.div`
  max-height: 100%;
  position: relative;
  margin: auto;
  display: flex;
  @media (max-width: 700px) {
    height: 100%;
    align-items: center;
    justify-content: center;
    min-height: -moz-min-content;
    min-height: -webkit-min-content;
    min-height: min-content;
    flex-direction: column;
  }
  @media (min-width: 700px) {
    height: 300px;
    flex-direction: row;
    justify-content: center;
  }
`;

export default () => {
  const [firstSelectedArtist, setFirstSelectedArtist] = useState({ confirmed: false });
  const [secondSelectedArtist, setSecondSelectedArtist] = useState({ confirmed: false });
  const [artistPath, setArtistPath] = useState(null);

  useEffect(() => {
    if (firstSelectedArtist.confirmed && secondSelectedArtist.confirmed) {
      const fetchArtistPathData = async () => {
        setArtistPath('LOADING');
        const result = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/getPath/${firstSelectedArtist.id}/${secondSelectedArtist.id}`);
        if (result.status === 200) {
          let data = await result.json();
          setArtistPath(data);
        }
      };
      fetchArtistPathData();
    }
  }, [firstSelectedArtist, secondSelectedArtist]);
  return (
    <StyledSuperWrapper>
      <StyledWrapper>
        <ArtistInput
          selectedArtist={firstSelectedArtist}
          setSelectedArtist={setFirstSelectedArtist}
          placeholder="Search your first artist"
          ariaLabel="Search your first artist from spotify and compare it with your second input"
        />
        { artistPath && <ArtistPath data={artistPath} />}
        <ArtistInput
          selectedArtist={secondSelectedArtist}
          setSelectedArtist={setSecondSelectedArtist}
          placeholder="Search your second artist"
          ariaLabel="Search your second artist from spotify and compare it with your first input"
        />
      </StyledWrapper>
    </StyledSuperWrapper>
  )
}
