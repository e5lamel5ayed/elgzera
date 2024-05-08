import React, { useState } from 'react';
import Drawer from '../../Components/Drawer';
import { Box, FormControl, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Paper, Button } from '@mui/material';
import QRCode from 'react-qr-code'; // Import QRCode library

export default function PayingOff() {
    const [tickets, setTickets] = useState([]);
    const [showQRCodes, setShowQRCodes] = useState(false); // State to control QR code display

    const handleAddTicket = (event) => {
        event.preventDefault();
        const nationality = event.target.elements.nationality.value;
        const guideName = event.target.elements.guideName.value;
        const boatName = event.target.elements.boatName.value;
        const ticketType = event.target.elements.ticketType.value;
        const ticketPrice = event.target.elements.ticketPrice.value;
        const ticketCount = event.target.elements.ticketCount.value; // Get ticket count
        const total = parseInt(ticketPrice) * parseInt(ticketCount); // Calculate total based on ticket count

        const newTicket = {
            nationality,
            guideName,
            boatName,
            ticketType,
            ticketPrice,
            ticketCount, // Add ticket count to ticket object
            total
        };

        setTickets([...tickets, newTicket]);
    };

    const handlePayment = () => {
        // Handle payment logic here
        // For now, let's just log a message
        console.log("Payment processed");

        // Set showQRCodes to true to display QR codes
        setShowQRCodes(true);
    };

    // Calculate total
    const total = tickets.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <div className='card table-style ' style={{ direction: "rtl" }}>
                    <div className="card-header table-head-stayl d-flex">
                        حجز تذكره
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddTicket}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="nationality" className="d-flex">الجنسيه</label>
                                        <select id="nationality" className="form-control" name="nationality">
                                            <option>مصري</option>
                                            <option>سعودي</option>
                                            <option>انجليزي</option>
                                            <option>امريكي</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="guideName" className="d-flex">اسم المرشد</label>
                                        <input type="text" className="form-control" id="guideName" name="guideName" />
                                    </div>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="boatName" className="d-flex">اسم المركب</label>
                                        <select id="boatName" className="form-control" name="boatName">
                                            <option>مركب 1</option>
                                            <option>مركب 2</option>
                                            <option>مركب 3</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="ticketType" className="d-flex">نوع التذكره</label>
                                        <select id="ticketType" className="form-control" name="ticketType">
                                            <option>تذاكر اطفال</option>
                                            <option>تذاكر كبار</option>
                                            <option>تذاكر عائليه</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="ticketPrice" className="d-flex">سعر التذكره</label>
                                        <input type="number" className="form-control" id="ticketPrice" name="ticketPrice" />
                                    </div>
                                    <div className='col-md-6 mt-3'>
                                        <label htmlFor="ticketCount" className="d-flex">عدد التذاكر</label>
                                        <input type="number" className="form-control" id="ticketCount" name="ticketCount" defaultValue="1" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">اضافه</button>
                        </form>
                    </div>
                </div>

                <div className="mt-4">
                    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className='table-head-stayl'>
                                <TableRow >
                                    <TableCell style={{ color: "#fff" }} align="right">الجنسيه</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المرشد</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المركب</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">نوع التذكره</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">سعر التذكره</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">عدد التذاكر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">المجموع</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{ticket.nationality}</TableCell>
                                        <TableCell align="right">{ticket.guideName}</TableCell>
                                        <TableCell align="right">{ticket.boatName}</TableCell>
                                        <TableCell align="right">{ticket.ticketType}</TableCell>
                                        <TableCell align="right">{ticket.ticketPrice}</TableCell>
                                        <TableCell align="right">{ticket.ticketCount}</TableCell>
                                        <TableCell align="right">{ticket.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px" }} align="right" colSpan={6}>المجموالكلي</TableCell>
                                    <TableCell sx={{ fontSize: "20px" }} align="right">{total}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
                <div className='container' style={{ width: "87%" }}>
                    <div className="mt-4 mb-5">
                        <Button variant="contained" style={{ backgroundColor: "#000" }} onClick={handlePayment}>دفع</Button>
                        {/* Display QR codes for each ticket when showQRCodes is true */}
                        {showQRCodes && tickets.map((ticket, index) => (
                            <div className='container'>
                                {/* <div className='row'> */}
                                        <div className=''>
                                    <div key={index} className="mt-4 text-center ">
                                            <h3>QR Code for Ticket {index + 1}</h3>
                                            <QRCode value={`Ticket ${index + 1}`} />
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>


            </Box>
        </div>
    );
}
