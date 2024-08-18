/* eslint-disable no-unused-vars */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL, DAILY_REPORTS } from '../../Components/Api';
import { Loading } from '../../Components/Loading';
import Swal from 'sweetalert2';
import Drawer from '../../Components/Drawer';

const DailyReport = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [dailyReports, setDailyReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    }

    const fetchDailyReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/${DAILY_REPORTS}`);
            const data = response.data;
            // console.log(data);

            setDailyReports(data);

           
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

        fetchDailyReports();

        return () => clearInterval(timer);
    }, []);


    // nationalityTranslations
    const nationalityTranslations = {
        "Egyptian": "مصري",
        "Saudi": "سعودي",
        "Kuwaiti": "كويتي",
        "Emirati": "إماراتي",
        "Qatari": "قطري",
        "Bahraini": "بحريني",
        "Omani": "عماني",
        "Jordanian": "أردني",
        "Lebanese": "لبناني",
        "Syrian": "سوري",
        "British": "بريطاني",
        "American": "أمريكي",
        "Canadian": "كندي",
        "Australian": "أسترالي"
    };

    const handlePrint = () => {
        window.print();
    }
    return (
        <div>
            <Drawer />
            <div className="box-container">
                <Box>
                    <div className='d-flex justify-content-around align-items-center mb-3 print-box'>
                        <div className='day-reports d-flex justify-content-center align-items-center'>
                            <div className='table-head'>
                                <p className='text-dark mr-1 m-0' style={{ fontSize: "20px" }}>التقرير اليومي التفصيلي : </p>
                            </div>
                            <div className=''>
                                <p className='text-info mr-1 m-0' style={{ fontSize: "20px" }}>{formatDate(currentTime)}</p>
                            </div>
                        </div>
                        {/* Print Button */}
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
                                        id
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">
                                        رقم التسلسل
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">
                                        فئة التذكرة
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="right">
                                        اسم المركب
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">
                                        اسم المرشد
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">
                                        الجنسية
                                    </TableCell>
                                    <TableCell className="text-center" style={{ color: "#fff" }} sx={{ fontSize: "18px" }} align="center">
                                        عدد التذاكر
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Loading />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    dailyReports.length > 0 ? (
                                        dailyReports.map((report, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.id}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.serialNumbers}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.category}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.cruise}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.tourGuide}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {nationalityTranslations[report.nationality] || report.nationality}
                                                </TableCell>
                                                <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                                                    {report.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                <h5>لا توجد بيانات</h5>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

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
                    }
                `}
            </style>
        </div>
    );
}

export default DailyReport;
