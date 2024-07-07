import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

export default function CruisesList() {
  const [cruises, setCruises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/Cruises');
        setCruises(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-head-stayl'>
          <TableRow>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">الاسم</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">الحاله</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">الوصف</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">صوره</TableCell>
          </TableRow>
        </TableHead>
        <TableBody align="center">
          {cruises.map((cruise) => (
            <TableRow
              key={cruise.id} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ fontSize: "18px" }} align="right" component="th" scope="row">
                {cruise.name}
              </TableCell>
              <TableCell sx={{ fontSize: "18px" }} align="right" >{cruise.statusId === 1 ? 'نشط' : 'غير نشط'}</TableCell>
              <TableCell align="center">{cruise.caption}</TableCell>
              <TableCell align="center">
                {cruise.image ? <img src={cruise.image} alt={cruise.name} style={{ width: '100px', height: 'auto' }} /> : 'لا توجد صورة'}
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
