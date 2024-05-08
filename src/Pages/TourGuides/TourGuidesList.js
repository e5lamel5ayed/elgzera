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
  createData('Alice Smith', 'active', 'alice@example.com', 'test 1', '2%'),
  createData('Bob Johnson', 'active', 'alice@example.com', 'test 1', '5%'),
  createData('Charlie Brown', 'in active', 'alice@example.com', 'test 2', '1%'),
  createData('Diana Lee', 'active',  'alice@example.com', 'test 1','2%'),
 
];

export default function TourGidesList() {
  // Calculate total price
  const total = rows.reduce((acc, row) => acc + row.calories, 0);

  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-head-stayl'>
          <TableRow>
            <TableCell style={{color:"#fff"}} align="right">الاسم</TableCell>
            <TableCell style={{color:"#fff"}} align="right">الحاله</TableCell>
            <TableCell style={{color:"#fff"}} align="right">الايميل</TableCell>
            <TableCell style={{color:"#fff"}} align="right">اسم الشركة</TableCell>
            <TableCell style={{color:"#fff"}} align="right">نسبة الربح</TableCell>
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
          
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
