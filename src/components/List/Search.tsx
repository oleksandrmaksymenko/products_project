import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment, TextField} from '@mui/material';
import React from 'react';

type SearchProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const Search: React.FC<SearchProps> = ({onChange, label}) => {
  return (
    <TextField
      onChange={onChange}
      label={label}
      size='small'
      sx={{width: 'calc(100% - 32px)', margin: '16px'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
