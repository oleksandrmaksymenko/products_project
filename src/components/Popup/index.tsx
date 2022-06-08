import React from 'react';
import {Modal, Paper, Typography, IconButton} from '@mui/material';
import {popupData} from 'src/components/Popup/popupData';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {clearPopup} from 'src/store/reducers/popup';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const PaperContainer = styled.div`
  max-width: 500px;
  width: 50%;
  padding: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`.withComponent(Paper);

const IconButtonContainer = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`.withComponent(IconButton);

const Popup = () => {
  const dispatch = useAppDispatch();
  const {title, isShow, props, type} = useAppSelector(state => state.popup);

  const handleClose = () => {
    dispatch(clearPopup());
  };

  const {componentType} = popupData({
    handleClose,
    ...props,
  });

  if (isShow)
    return (
      <Modal open={isShow} onClose={handleClose}>
        <PaperContainer>
          {!props.hideClose && (
            <IconButtonContainer onClick={handleClose}>
              <CloseIcon />
            </IconButtonContainer>
          )}
          <Typography variant='h6' component='p' color='secondary'>
            {title}
          </Typography>

          {componentType[type]}
        </PaperContainer>
      </Modal>
    );

  return null;
};

export default Popup;
