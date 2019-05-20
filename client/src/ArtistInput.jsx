import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from './icons/Search.svg';
import Artist from './Artist';
import { StyledArtistWrapper } from './styles';

// https://codepen.io/anon/pen/RmNxwb
const StyledSuperWrapper = styled(StyledArtistWrapper)`
  background-color: ${({ theme }) => theme.black};
  perspective: 800px;
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center top;
  transition: transform 1s ease;
  transform: rotateY(${({ rotate }) => rotate}deg);
`;

const StyledArticle = styled.article`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const StyledArticleInput = styled(StyledArticle)`
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  background-color: ${({ theme }) => theme.darkGray};
`;

const StyledArticleArtist = styled(StyledArticle)`
  transform: rotateY(180deg);
`;

const StyledLabel = styled.label`
  height: 16px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 2px;
  margin-bottom: 3px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 16px;
  height: 16px;
`;

const StyledHr = styled.hr`
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  margin: 0;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
`;

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => theme.white};
  background-color: transparent;
  font-size: 20px;
  line-height: 34px;
  margin-left: 7px;
  width: calc(100% - 5px);
  padding: 0;
  -webkit-appearance: textfield;
  &:focus {
    outline: none;
    + ${StyledHr} {
      background-color: ${({ theme }) => theme.primary};
    }
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.white};
  background-color: transparent;
  border: none;
  width: calc(100% - 16px);
  text-align: left;
  padding: 11px 0px;
  margin-left: 8px;
  font-size: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  &:focus, &:hover {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledUl = styled.ul`
  overflow: auto;
  max-height: calc(100% - 37px);
  & > li {
    &:last-of-type {
      ${StyledButton} {
        border-bottom: none;
      }
    }
  }
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.white};
  margin: 11px 7px;
  font-size: 20px;
  line-height: 25px;
`;

const ArtistSuggestion = ({ data, setSelectedArtist }) => (
  <li>
    <form onSubmit={event => {
      event.preventDefault();
      setSelectedArtist({ ...data, confirmed: true });
    }}>
      <StyledButton>{data.name}</StyledButton>
    </form>
  </li>
);

let timeout = 0;
const Search = ({ searchArtists, resetArtists, setProcessText }) => {
  const [value, setValue] = useState('');

  const initiateArtistSearch = () => {
    setProcessText(`Waiting until you're done typing`);
    if (value.length === 0) resetArtists();
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (value.length !== 0) searchArtists(value);
    }, 500);
  };

  return (
      <StyledInput 
        aria-label="Search your first spotify artist to make a comparisson with the second artist" 
        placeholder="Search your first artist"
        type="search"
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyUp={initiateArtistSearch}
        spellcheck="false"
      />
  )
}

export default ({ selectedArtist, setSelectedArtist }) => {
  const [artists, setArtists] = useState(null);
  const [processText, setProcessText] = useState('');
  const resetArtists = () => {
    setProcessText('');
    setArtists(null);
  };
  const searchArtists = async (name) => {
    setProcessText('Searching for artists via Spotify...');
    const result = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/search/${name}`);
    setProcessText('');
    if (result.status === 200) {
      let data = await result.json();
      setArtists(data);
    }
    else if (result.status === 404) {
      setArtists({ error: 'No artist found 😞. Try to be more specific.'});
    } else {
      setArtists({ error: 'Oops something went wrong 😳'});
    }
  }

  const getContent = () => {
    if (Array.isArray(artists)) {
      return (
        <StyledUl>
          {
            artists.map((data) => (
              <ArtistSuggestion 
                data={data}
                key={data.id}
                setSelectedArtist={setSelectedArtist}
              />
            ))
          }
        </StyledUl>
      );
    }
    if (processText) return <StyledParagraph>{processText}</StyledParagraph>;
    if (artists && artists.error) return <StyledParagraph>{artists.error}</StyledParagraph>;
  }
  return (
    <StyledSuperWrapper>
      <StyledWrapper rotate={selectedArtist.confirmed ? 180 : 0}>
        <StyledArticleInput pointerEvents={(selectedArtist.confirmed) ? 'none' : 'all'}>
          <StyledInputWrapper>
            <StyledLabel><StyledSearchIcon/></StyledLabel>
            <Search setProcessText={setProcessText} searchArtists={searchArtists} resetArtists={resetArtists} />
            <StyledHr/>
          </StyledInputWrapper>
          {getContent()}
        </StyledArticleInput>
        <StyledArticleArtist>
          {selectedArtist && <Artist backArrow setSelectedArtist={setSelectedArtist} data={selectedArtist} />}
        </StyledArticleArtist>
      </StyledWrapper>
    </StyledSuperWrapper>
  )
}