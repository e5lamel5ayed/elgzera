import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';

const TicketTable = ({ tickets, handleIncreaseTicketCount, handleDecreaseTicketCount, handleDeleteTicket, total, handlePaymentConfirmation, showError, handleCloseError }) => {
    return (
        <TableContainer sx={{ borderRadius: "10px" }} component={Paper}>
            <Table>
                <TableHead className='table-head-style text-white' style={{ backgroundColor: "#275a88" }}>
                    <TableRow className=' text-white'>
                        <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>نوع التذكرة</TableCell>
                        <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>السعر</TableCell>
                        <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>عدد التذاكر</TableCell>
                        <TableCell className="text-center" style={{ color: "#fff", fontSize: "18px" }}>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center" style={{ fontSize: "18px" }}>{ticket.ticketType}</TableCell>
                            <TableCell className="text-center" style={{ fontSize: "18px" }}>{ticket.ticketPrice * ticket.ticketCount} $</TableCell>
                            <TableCell className="text-center">
                                <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                    <AddIcon sx={{ backgroundColor: "#199119", borderRadius: "3px", padding: "0px", marginRight: "5px", color: "#fff" }} />
                                </IconButton>
                                {ticket.ticketCount}
                                <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                    <RemoveIcon sx={{ backgroundColor: "#c72c2c", borderRadius: "3px", padding: "0px", marginLeft: "5px", color: "#fff" }} />                                                                    </IconButton>
                            </TableCell>
                            <TableCell className="text-center">
                                <IconButton onClick={() => handleDeleteTicket(index, ticket.ticketType)}>
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center">
                            <Button
                                variant="contained"
                                sx={{ fontSize: "19px", backgroundColor: "#275a88" }}
                                startIcon={<PaymentIcon className='ml-2' />}
                                onClick={handlePaymentConfirmation}
                                aria-hidden={false}
                            >
                                دفع
                            </Button>

                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {showError && (
                <div className="error-log mt-2">
                    <p>برجاء تحديد كل من الجنسية، المرشد، المركب واضافة تذاكر قبل الدفع.</p>
                    <Button variant="contained" onClick={handleCloseError}>إغلاق</Button>
                </div>
            )}
        </TableContainer>
    );
};

export default TicketTable;
