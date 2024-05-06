import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(الاسم, الرقم, اليوم) {
  return { الاسم, الرقم, اليوم};
}

const rows = [
  createData('General Admission', 100, 'Monday'),
  createData('VIP Experience', 50, 'Saturday'),
  createData('Family Pack', 20, 'Saturday' ),
 
];

export default function CategoryList() {
  return (

      <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell> */}
               <TableCell align="center" className='span-edit'>الاسم</TableCell>
              
              <TableCell align="center" className='span-edit'>رقم التذكرة</TableCell>
              <TableCell align="center" className='span-edit'>ايام النشاط</TableCell>
             
            
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

<TableCell component="th" scope="row" align="center">
                  {row.الاسم}
                </TableCell>

                <TableCell align="center">{row.الرقم}</TableCell>
                
               
                <TableCell align="center">{row.اليوم}</TableCell>
                
                
                
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


  );
}
