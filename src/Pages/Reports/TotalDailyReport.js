/* eslint-disable no-unused-vars */
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseURL, TOTAL_DAILY_REPORTS } from '../../Components/Api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loading } from '../../Components/Loading';
import Drawer from '../../Components/Drawer';

const TotalDailyReport = () => {
    const [totalDailyReports, setTotalDailyReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [formattedDate, setFormattedDate] = useState('');


    const fetchTotalDailyReports = async (date) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/reports/total-daily-report?date=${date}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = response.data;
            setTotalDailyReports(data);
        } catch (error) {
            Swal.fire({
                text: "حدث خطأ أثناء جلب التقارير اليومية. يرجى المحاولة مرة أخرى لاحقًا.",
                icon: "error",
                confirmButtonText: "حسنًا",
                customClass: {
                    popup: 'small-swal',
                    confirmButton: 'custom-confirm-button'
                }
            });
            console.error("Error fetching daily reports:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    };

    useEffect(() => {
        setFormattedDate(formatDate(selectedDate));
        fetchTotalDailyReports(selectedDate);
    }, [selectedDate]);

    const handlePrint = () => {
        window.print();
    }

    return (
        <div>
            <Drawer />
            <div className="box-container">
                <Box>
                    {/* title  */}
                    <div className='d-flex justify-content-around align-items-center mb-3 print-box'>
                        <div className='day-reports d-flex justify-content-center align-items-center'>
                            <div className='table-head'>
                                <p className='text-dark mt-1 ml-1 m-0' style={{ fontSize: "20px" }}>التقرير اليومي الاجمالي :</p>
                            </div>
                            <p className='text-info fotmat-date mt-3 text-center' style={{ fontSize: "20px" }}>{formattedDate}</p>

                            <div className=''>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        borderRadius: "15px",
                                        border: "1px solid grey",
                                        padding: "20px",
                                        marginRight: '5px'

                                    }} />
                            </div>

                        </div>
                        <Box >
                            <Button
                                variant="contained"
                                onClick={handlePrint}
                                className="print-button"
                            >
                                طباعة
                            </Button>
                        </Box>
                    </div>

                    <TableContainer className="table-style table table-hover" sx={{ direction: "rtl" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className="table-head-style">
                                <TableRow>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">
                                        فئة التذكرة
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">
                                        عدد التذاكر
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">
                                        سعر التذكرة
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">
                                        الاجمالى
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Loading />
                                        </TableCell>
                                    </TableRow>
                                ) : totalDailyReports.length > 0 ? (
                                    totalDailyReports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                {report.category}
                                            </TableCell>
                                            <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                {report.quantity}
                                            </TableCell>
                                            <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                {report.price} $
                                            </TableCell>
                                            <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                {report.totalPrice} $
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <h5>لا توجد بيانات</h5>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <Button
                            variant="contained"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='ml-2'
                        >
                            السابق
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handlePageChange(currentPage + 1)}
                            sx={{ marginLeft: '8px' }}
                            disabled={currentPage >= Math.ceil(totalDailyReports.length / pageSize)}
                        >
                            التالي
                        </Button>
                    </Box> */}


                </Box>
            </div>

            <style>
                {`
                    @media print {
                        .print-button {
                            display: none;
                        }
                        .MuiDrawer-root {
                            display: none;
                        }
                        input {
                            display: none;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default TotalDailyReport;
