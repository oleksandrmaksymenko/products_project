import {Button} from '@mui/material';
import React from 'react';
import {StackTopContainer} from 'src/ui';

type ModalButtonsProps = {handleClose: () => void; handleCreate: () => void};

const ModalButtons: React.FC<ModalButtonsProps> = ({
  handleClose,
  handleCreate,
}) => {
  return (
    <StackTopContainer
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
      spacing={2}
    >
      <Button color='primary' onClick={handleClose}>
        Cancel
      </Button>
      <Button color='secondary' onClick={handleCreate}>
        Submit
      </Button>
    </StackTopContainer>
  );
};

export default ModalButtons;
