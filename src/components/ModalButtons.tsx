import {Button} from '@mui/material';
import React from 'react';
import {StackTopContainer} from 'src/ui';

type ModalButtonsProps = {
  handleClose: () => void;
  handleCreate?: () => void;
  submit?: boolean;
  error?: boolean;
};

const ModalButtons: React.FC<ModalButtonsProps> = ({
  handleClose,
  handleCreate,
  submit,
  error,
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
      <Button
        color='secondary'
        onClick={handleCreate}
        type={submit ? 'submit' : 'button'}
        disabled={!error}
      >
        Submit
      </Button>
    </StackTopContainer>
  );
};

export default ModalButtons;
