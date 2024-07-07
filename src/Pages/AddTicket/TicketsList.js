import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/Tickets', {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const dayMapping = {
    1: 'السبت',
    2: 'الأحد',
    3: 'الاثنين',
    4: 'الثلاثاء',
    5: 'الأربعاء',
    6: 'الخميس',
    7: 'الجمعة'
  };

  const categoryMapping = {
    1: 'عائلي',
    2: 'خاص',
    3: 'فردي'
  };

  const currencyMapping = {
    1: '$',
    2: '€',
    3: '฿',
    4: '¥'
  };

  const getDayNames = (dayNumbers) => {
    if (!Array.isArray(dayNumbers)) return '';
    return dayNumbers.map((day) => dayMapping[day] || day).join(', ');
  };

  return (
    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-head-style'>
          <TableRow>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">الاسم</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">نوع التذكرة</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">السعر</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">الضرائب</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">العملة</TableCell>
            <TableCell style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">الأيام</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((ticket) => (
              <TableRow key={ticket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontSize: "18px" }} align="right" component="th" scope="row">{ticket.name}</TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">{categoryMapping[ticket.categoryId]}</TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">{ticket.price}</TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">{ticket.taxes}</TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">{currencyMapping[ticket.currencyId]}</TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">{getDayNames(ticket.days)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                لا توجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
