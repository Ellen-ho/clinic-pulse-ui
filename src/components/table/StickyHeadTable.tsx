import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  SxProps,
  Theme,
} from '@mui/material';
import NoDataFound from '../signs/NoDataFound';
import DataLoading from '../signs/DataLoading';

export interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  render?: (value: any) => React.ReactNode;
}

interface ITableData {
  [key: string]: any;
}

interface StickyHeadTableProps {
  columns: IColumn[];
  data: ITableData[];
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (id: string) => void;
  sx?: SxProps<Theme>;
  isLoading?: boolean;
}

const StickyHeadTable: React.FC<StickyHeadTableProps> = ({
  columns,
  data,
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  sx,
  isLoading,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
}) => {
  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        paddingBottom: '52px',
        ...sx,
      }}
    >
      {isLoading && <DataLoading />}
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: '100%' }}>
            {!isLoading && data.length === 0 && <NoDataFound />}
            {data.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                onClick={() => onRowClick?.(row.id)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.render ? column.render(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          background: '#fff',
        }}
        labelRowsPerPage={'每頁數量'}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default StickyHeadTable;
