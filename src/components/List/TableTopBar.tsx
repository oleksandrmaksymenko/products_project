import AddSharpIcon from '@mui/icons-material/AddSharp';
import {Button, Typography} from '@mui/material';
import React from 'react';
import {StackBottomContainer} from 'src/ui';

type TableTopBarProps = {
  handleClick: () => void;
  title: string;
  type: string;
};

const TableTopBar: React.FC<TableTopBarProps> = ({
  handleClick,
  title,
  type,
}) => {
  return (
    <StackBottomContainer
      direction='row'
      justifyContent='space-between'
      alignItems='stretch'
    >
      <Typography variant='h5' color='primary'>
        {title}
      </Typography>
      <Button
        onClick={handleClick}
        color='secondary'
        variant='contained'
        startIcon={<AddSharpIcon sx={{color: '#fff'}} />}
      >
        Create {type}
      </Button>
    </StackBottomContainer>
  );
};

export default TableTopBar;
