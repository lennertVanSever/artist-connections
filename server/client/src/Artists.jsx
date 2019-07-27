import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ArtistInput from './ArtistInput';
import ArtistPath from './ArtistPath';
import { ReactComponent as ShareIcon } from './icons/Share.svg';
import { ReactComponent as ReloadIcon } from './icons/Reload.svg';

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

const iconStyle = css`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;

const StyledShareIcon = styled(ShareIcon)`
  ${iconStyle}
  position: relative;
  right: 2px;
`;

const StyledReloadIcon = styled(ReloadIcon)`
  ${iconStyle}
`;

const StyledSingleIconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin: 0px 10px;
  padding: 0;
  background-color: transparent;
  @media (min-width: 700px) {
    margin: 10px 0px;
  }
  &:focus, &:hover {
    outline: none;
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    margin-bottom: 25px;
  }
  @media (min-width: 700px) {
    margin-right: 25px;
    flex-direction: column;
  }
`;

export default () => {
  const initialSelectedState = { confirmed: false };
  const [firstSelectedArtist, setFirstSelectedArtist] = useState(initialSelectedState);
  const [secondSelectedArtist, setSecondSelectedArtist] = useState(initialSelectedState);
  const [artistPath, setArtistPath] = useState(null);

  useEffect(() => {
    if (firstSelectedArtist.confirmed && secondSelectedArtist.confirmed) {
      const fetchArtistPathData = async () => {
        setArtistPath('LOADING');
        const result = await fetch(`/getPath/${firstSelectedArtist.id}/${secondSelectedArtist.id}`);
        window.history.replaceState({}, '', `/artists/${firstSelectedArtist.id}/${secondSelectedArtist.id}`);
        document.title = `From ${firstSelectedArtist.name} to ${secondSelectedArtist.name}`;
        if (result.status === 200) {
          let data = await result.json();
          setArtistPath(data);
        }
      };
      fetchArtistPathData();
    } else {
      document.title = 'Artist Connections';
      if (firstSelectedArtist.confirmed !== secondSelectedArtist.confirmed) {
        window.history.replaceState({}, '', `/artists`);
      }
    }
  }, [firstSelectedArtist, secondSelectedArtist]);

  useEffect(() => {
    const linkParams = window.location.pathname.split('/');
    if (linkParams[2] && !firstSelectedArtist.confirmed && !secondSelectedArtist.confirmed) {
      console.log('fetch artist from URL');
      const fetchArtistsData = async () => {
        const result = await fetch(`/getArtists/${linkParams[2]}/${linkParams[3]}`);
        if (result.status === 200) {
          let data = await result.json();
          setFirstSelectedArtist({ ...data[0], confirmed: true });
          setSecondSelectedArtist({ ...data[1], confirmed: true });
        }
      }
      fetchArtistsData();
    }
  })

  useEffect(() => {
    if (artistPath) {
      if (artistPath.message === 'DIRECT CONNECTION') {
        window.alert(`${firstSelectedArtist.name} and ${secondSelectedArtist.name} seem to have a direct connection. They have no level of seperation.`);
      }
      if (artistPath.message === 'NOT FOUND') {
        window.alert(`One of the given artists seems to have no related artists. We can't calculate the level of seperation.`);
      }
    }
  }, [artistPath]);

  return (
    <>
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
          {artistPath && (Array.isArray(artistPath) || artistPath.message) && (
            <StyledIconWrapper>
              {navigator.share && (
                <form>
                  <StyledSingleIconWrapper>
                    <StyledShareIcon />
                  </StyledSingleIconWrapper>
                </form>
              )}
              <form
                onSubmit={event => {
                  event.preventDefault();
                  window.location.href = '/';
                }}
              >
                <StyledSingleIconWrapper>
                  <StyledReloadIcon />
                </StyledSingleIconWrapper>
              </form>
            </StyledIconWrapper>
          )}
        </StyledWrapper>
      </StyledSuperWrapper>
    </>
  )
}
