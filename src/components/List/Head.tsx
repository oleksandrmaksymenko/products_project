import {TableCell, TableHead, TableRow} from '@mui/material';
import React from 'react';

type ListHeadProps = {
  head: string[];
};

const ListHead: React.FC<ListHeadProps> = ({head}) => {
  return (
    <TableHead>
      <TableRow>
        {head && head.map(item => <TableCell key={item}>{item}</TableCell>)}
      </TableRow>
    </TableHead>
  );
};

export default ListHead;
