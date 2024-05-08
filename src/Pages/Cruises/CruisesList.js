import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

function createData(name, status, caption, image) {
  return { name, status, caption, image};
}

const rows = [
  createData('Caribbean Adventure', 'active', 'Captain Jack Sparrow', <img style={{height:"100px",width:"100px"}} src='https://cruisefever.net/wp-content/uploads/2019/03/nclsky4.jpg'></img> ),
  createData('Mediterranean Magic', 'active', 'Captain Jack Sparrow',  <img style={{height:"100px",width:"100px"}} src='https://cruisefever.net/wp-content/uploads/2019/03/nclsky4.jpg'></img>  ),
  createData('Pacific Paradise', 'in-active', 'Captain Jack Sparrow',  <img style={{height:"100px",width:"100px"}} src='https://cruisefever.net/wp-content/uploads/2019/03/nclsky4.jpg'></img> ),

];

export default function CruisesList() {
  // Calculate total price
  const total = rows.reduce((acc, row) => acc + row.calories, 0);

  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">الاسم</TableCell>
            <TableCell align="right">الحاله</TableCell>
            <TableCell align="center">الوصف</TableCell>
            <TableCell align="center">صوره</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody align="center" >
          {rows.map((row) => (
            <TableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell  align="right"  component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right" >{row.status}</TableCell>
              <TableCell  align="center">{row.caption}</TableCell>
              <TableCell  align="center">{row.image}</TableCell>
             
            </TableRow>
            
          ))}
        </TableBody>
        <TableFooter>
          
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
