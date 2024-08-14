
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Drawer from '../../Components/Drawer';
// import { Loading } from '../../Components/Loading';

const Reports = () => {
    // const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDay, setCurrentDay] = useState('');
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    };
    // get day function 
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div>
            <Drawer />
            <div className='box-container'>
                <Box>
                    <div>
                        {/* {loading && <Loading />} */}
                        <div className='day-reports d-flex justify-content-center align-items-center'>
                            <div className='table-head'>
                                <p className='text-dark mr-1 m-0' style={{ fontSize: "20px" }}>التقرير اليومي التفصيلي : </p>
                            </div>
                            <div className=''>
                                <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>{formatDate(currentTime)}</p>
                            </div>
                        </div>

                        {/* day reports  */}
                        <TableContainer className="table-style table table-hover" sx={{ direction: "rtl" }} component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className="table-head-style">
                                    <TableRow>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right" >
                                            فئة التذكرة
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right" >
                                            اسم المركب
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center" >
                                            اسم المرشد
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center" >
                                            الجنسية
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center"
                                        >
                                            عدد التذاكر
                                        </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >

                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right" component="th" scope="row" >
                                            الفئة
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            المركب
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            المرشد
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            الجنسية
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            عدد التذاكر
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center" colSpan={7} align="center">
                                            <h5>لا توجد بيانات</h5>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className='day-reports d-flex justify-content-center align-items-center mt-5'>
                            <div className='table-head'>
                                <p className='text-dark mr-1 m-0' style={{ fontSize: "20px" }}>التقرير اليومي الاجمالي : </p>
                            </div>
                            <div className=''>
                                <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>{formatDate(currentTime)}</p>
                            </div>
                        </div>

                        {/* all day reports  */}
                        <TableContainer className="table-style table table-hover" sx={{ direction: "rtl" }} component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className="table-head-style">
                                    <TableRow>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right" >
                                            فئة التذكرة
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right" >
                                            عدد التذاكر
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center" >
                                            القيمه
                                        </TableCell>

                                        <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center"
                                        >
                                            الاجمالى
                                        </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >

                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right" component="th" scope="row" >
                                            الفئة
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            عدد التذاكر
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            القيمه
                                        </TableCell>
                                        <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                            الاجمالى
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center" colSpan={7} align="center">
                                            <h5>لا توجد بيانات</h5>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Reports