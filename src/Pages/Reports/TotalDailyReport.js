import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseURL, TOTAL_DAILY_REPORTS } from '../../Components/Api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loading } from '../../Components/Loading';

const TotalDailyReport = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [totalDailyReports, setTotalDailyReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [paginatedReports, setPaginatedReports] = useState([]);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    }

    const fetchTotalDailyReports = async (pageNumber = 1, pageSize = 5) => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/${TOTAL_DAILY_REPORTS}/${pageNumber}/${pageSize}`);
            setTotalDailyReports(response.data);
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        fetchTotalDailyReports();

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Paginate the reports based on currentPage and pageSize
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPaginatedReports(totalDailyReports.slice(startIndex, endIndex));
    }, [totalDailyReports, currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(totalDailyReports.length / pageSize)) {
            setCurrentPage(newPage);
        }
    }

    return (
        <div className='mb-5'>
            {/* title  */}
            <div className='day-reports d-flex justify-content-center align-items-center mt-5'>
                <div className='table-head'>
                    <p className='text-dark mr-1 m-0' style={{ fontSize: "20px" }}>التقرير اليومي الاجمالي : </p>
                </div>
                <div className=''>
                    <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>{formatDate(currentTime)}</p>
                </div>
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
                        ) : paginatedReports.length > 0 ? (
                            paginatedReports.map((report, index) => (
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

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
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
            </Box>
        </div>
    );
}

export default TotalDailyReport;
