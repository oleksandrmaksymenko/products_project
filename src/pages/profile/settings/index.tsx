import React from 'react';
import Switch from '@mui/material/Switch';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {setTheme} from 'src/store/reducers';

const Index = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);

  return (
    <div>
      <div>
        Change to dark theme
        <Switch onChange={() => dispatch(setTheme(!theme))} value={theme} />
      </div>
    </div>
  );
};

export default Index;
