import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtistInput from './ArtistInput';
import ArtistPath from './ArtistPath';

const StyledSuperWrapper = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  overflow: auto;
`;

const StyledWrapper = styled.div`
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (orientation: landscape) {
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
        <ArtistInput selectedArtist={firstSelectedArtist} setSelectedArtist={setFirstSelectedArtist} />
        { artistPath && <ArtistPath data={artistPath} />}
        <ArtistInput selectedArtist={secondSelectedArtist} setSelectedArtist={setSecondSelectedArtist} />
      </StyledWrapper>
    </StyledSuperWrapper>
  )
}
