import React from 'react';
import {Snackbar} from '@mui/material';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {clearSnackBar} from 'src/store/reducers/snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackBar = () => {
  const {isShow, type, text} = useAppSelector(state => state.snackBar);

  const dispatch = useAppDispatch();

  const snackClose = () => {
    dispatch(clearSnackBar());
  };

  return (
    <Snackbar
      open={isShow}
      onClose={snackClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      key={type}
      autoHideDuration={4000}
    >
      <Alert onClose={snackClose} severity={type} sx={{width: '100%'}}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
