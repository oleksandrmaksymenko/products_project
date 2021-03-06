import styled from '@emotion/styled';
import {Stack} from '@mui/material';

export const ListContainer = styled.div`
  width: 100vw;
  max-width: 1200px;
`;

export const StackBottomContainer = styled.div`
  margin-bottom: 16px;
`.withComponent(Stack);

export const StackTopContainer = styled.button`
  margin-top: 16px;
`.withComponent(Stack);
