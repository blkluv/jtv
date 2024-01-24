import React from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBarWrapper = styled(Stack)`
  padding: 16px;
  background: #000;
  width: 100%;
  margin: 16px 0 0;

  .MuiInputBase-root {
    color: #fff;
  }
`;

interface ISearchBarProps {
  searchCallback: any;
}
export default function SearchBar(props: ISearchBarProps) {
  const { searchCallback } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCallback(event.target.value);
  };

  return (
    <SearchBarWrapper spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search gifs, stickers, videos'
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={onChange}
          />
        )}
      />
    </SearchBarWrapper>
  );
}
