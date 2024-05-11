import React, { useState } from 'react';
import Drawer from '../../Components/Drawer';
import { Box, FormControl, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Paper, Button, IconButton, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import QRCode from 'react-qr-code'; // استيراد مكتبة QRCode
import PersonIcon from '@mui/icons-material/Person';
// استيراد الأيقونة المستخدمة لحذف التذاكر
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// الفئات المختلفة للتذاكر
const ticketCategories = {
    'مصري': [
        { name: 'تذاكر اطفال', price: 50 },
        { name: 'تذاكر كبار', price: 100 },
        { name: 'تذاكر عائلية', price: 200 }
    ],
    'سعودي': [
        { name: 'تذاكر اطفال', price: 20 },
        { name: 'تذاكر كبار', price: 50 },
        { name: 'تذاكر عائلية', price: 150 }
    ],
    'انجليزي': [
        { name: 'تذاكر اطفال', price: 5 },
        { name: 'تذاكر كبار', price: 10 },
        { name: 'تذاكر عائلية', price: 25 }
    ],
    'امريكي': [
        { name: 'تذاكر اطفال', price: 10 },
        { name: 'تذاكر كبار', price: 20 },
        { name: 'تذاكر عائلية', price: 50 }
    ]
};

export default function PayingOff() {
    const [selectedNationality, setSelectedNationality] = useState("مصري"); // حالة لتخزين الجنسية المختارة
    const [selectedGuideName, setSelectedGuideName] = useState(""); // حالة لتخزين اسم المرشد
    const [tickets, setTickets] = useState([]); // حالة لتخزين التذاكر
    const [showQRCodes, setShowQRCodes] = useState(false); // حالة لعرض رموز الاستجابة السريعة QR
    const [openDialog, setOpenDialog] = useState(false); // حالة لعرض الحوار

    // إضافة تذكرة جديدة على أساس الفئة المختارة
    const handleAddTicket = (category) => {
        const newTicket = {
            nationality: selectedNationality,
            guideName: selectedGuideName,
            ticketType: category.name,
            ticketPrice: category.price,
            ticketCount: 1 // إضافة حقل جديد لعدد التذاكر
        };

        setTickets([...tickets, newTicket]);
    };

    // حذف تذكرة
    const handleDeleteTicket = (index) => {
        const updatedTickets = [...tickets];
        updatedTickets.splice(index, 1);
        setTickets(updatedTickets);
    };

    // زيادة عدد التذاكر
    const handleIncreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        updatedTickets[index].ticketCount++;
        setTickets(updatedTickets);
    };

    // تقليل عدد التذاكر
    const handleDecreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        if (updatedTickets[index].ticketCount > 1) {
            updatedTickets[index].ticketCount--;
            setTickets(updatedTickets);
        }
    };

    // معالجة الدفع
    const handlePayment = () => {
        setShowQRCodes(true);
    };

    // إغلاق الحوار
    const handleCloseDialog = () => {
        setShowQRCodes(false);
    };

    // الطباعة
    const handlePrint = () => {
        window.print();
    };

    // حساب المجموع
    const total = tickets.reduce((acc, curr) => acc + curr.ticketPrice * curr.ticketCount, 0);

    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <div className='card table-style ' style={{ direction: "rtl" }}>
                    <div className="card-header table-head-stayl d-flex">
                        حجز تذكرة
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className='col-md-6 mt-3'>
                                    <label htmlFor="nationality" className="d-flex">الجنسية</label>
                                    <Select id="nationality" value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} className="form-control">
                                        {Object.keys(ticketCategories).map((nationality, index) => (
                                            <MenuItem key={index} value={nationality}>{nationality}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className='col-md-6 mt-3'>
                                    <label htmlFor="guideName" className="d-flex">اسم المرشد</label>
                                    <OutlinedInput id="guideName" value={selectedGuideName} onChange={(e) => setSelectedGuideName(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            >
                                {ticketCategories[selectedNationality].map((category, index) => (
                                    <div
                                    
                                    key={index} className='col-md-3 mt-4 '>
                                        <div className="d-flex flex-column align-items-center ticket">
                                            <IconButton className='' onClick={() => handleAddTicket(category)}>
                                                <PersonIcon
                                                sx={{
                                                    color: "#000",
                                                    fontSize: "100px"
                                                }}
                                                />
                                            </IconButton>
                                            <span>{category.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className='table-head-stayl'>
                                <TableRow>
                                    <TableCell style={{ color: "#fff" }} align="right">الجنسية</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المرشد</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">نوع التذكرة</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">عدد التذاكر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">السعر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{ticket.nationality}</TableCell>
                                        <TableCell align="right">{ticket.guideName}</TableCell>
                                        <TableCell align="right">{ticket.ticketType}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                                <RemoveIcon
                                                sx={{
                                                    backgroundColor: "#c72c2c",
                                                    borderRadius: "3px",
                                                    padding:" 0px",
                                                    marginLeft: "5px",
                                                    color: "#fff"
                                                }}
                                                /></IconButton>
                                            {ticket.ticketCount}
                                            <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                                
                                                <AddIcon
                                                sx={{
                                                    backgroundColor: "#199119",
                                                    borderRadius: "3px",
                                                    padding:" 0px",
                                                    marginRight: "5px",
                                                    color: "#fff"
                                                }}
                                                /></IconButton>
                                        </TableCell>
                                        <TableCell align="right">{ticket.ticketPrice * ticket.ticketCount}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDeleteTicket(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px" }} align="right" colSpan={4}>المجموع الكلي</TableCell>
                                    <TableCell sx={{ fontSize: "20px" }} align="right">{total}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>

                <div className='container' style={{ width: "87%" }}>
                    <div className="mt-4 mb-5">
                        <Button variant="contained" style={{ backgroundColor: "#000" }} onClick={handlePayment}><PaymentIcon sx={{marginRight:"4px",fontSize:"19px"}}/> دفع</Button>
                    </div>
                </div>

                {/* حوار عرض رموز الاستجابة السريعة QR */ }
    <Dialog maxWidth open={showQRCodes} onClose={handleCloseDialog}>
        <DialogTitle>رموز الاستجابة السريعة</DialogTitle>
        <DialogContent>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                {tickets.map((ticket, index) => (
                    <div
                        style={{
                            border: "1px #000 solid",
                            padding: "17px"
                        }}
                        key={index} className="mt-4 ml-2 text-center">
                        <Typography variant="h6" gutterBottom>رمز الاستجابة السريعة QR للتذكرة {index + 1}</Typography>
                        <QRCode value={`تذكرة ${index + 1}`} />
                    </div>
                ))}
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handlePrint}>طباعة</Button>
            <Button onClick={handleCloseDialog}>إلغاء</Button>
        </DialogActions>
    </Dialog>
            </Box >
        </div >
    );
}
