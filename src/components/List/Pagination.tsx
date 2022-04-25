import React from 'react';
import TablePagination from '@mui/material/TablePagination';

type PaginationProps = {
  page: number;
  setPage: (repPage: number) => void;
  pageCount: number;
};

const Pagination: React.FC<PaginationProps> = ({page, setPage, pageCount}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component='div'
      count={pageCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[-1]}
    />
  );
};

export default Pagination;
