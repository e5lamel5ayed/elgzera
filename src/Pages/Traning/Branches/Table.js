import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function createData(name, city, phone, status) {
  return { name, city, phone, status };
}

const rows = [
  createData('Media City', 'القاهرة', '01012345678', 'active'),
  createData('Alexandria office', 'الإسكندرية', '01123456789', 'active'),
  createData('korba', 'الجيزة', '01234567890', 'inactive'),
  createData('Unicom', 'الفيوم', '01234567891', 'active'),
];

export default function BranchesList() {
  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-head-stayl'>
          <TableRow>
            <TableCell style={{color:"#fff"}} align="right">الاسم</TableCell>
            <TableCell style={{color:"#fff"}} align="right">المدينة</TableCell>
            <TableCell style={{color:"#fff"}} align="right">التليفون</TableCell>
            <TableCell style={{color:"#fff"}} align="right">الحالة</TableCell>
            <TableCell style={{color:"#fff"}} align="right">حذف</TableCell>
            <TableCell style={{color:"#fff"}} align="right">تعديل</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
