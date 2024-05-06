import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, '$'),
  createData('Ice cream sandwich', 237, 9.0, 37, '€'),
  createData('Eclair', 262, 16.0, 24, '฿'),
  createData('Cupcake', 305, 3.7, 67, '¥'),
  createData('Gingerbread', 356, 16.0, 49, '€'),
];

export default function BasicTable() {
  // Calculate total price
  const total = rows.reduce((acc, row) => acc + row.calories, 0);

  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">الاسم</TableCell>
            <TableCell align="right">نوع التذكره</TableCell>
            <TableCell align="right">السعر</TableCell>
            <TableCell align="right">الضرائب</TableCell>
            <TableCell align="right">العمله</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell sx={{fontSize:"20px"}} align="right" colSpan={2}>  المجموع:</TableCell>
            <TableCell sx={{fontSize:"20px"}} align="right">{total}</TableCell>
            <TableCell align="right" colSpan={2}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
