import { Typography } from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import utf8 from 'utf8';

const PrintComponent = React.forwardRef(({ tickets, total, nationalityTranslations, currencyNames }, ref) => (
    <div ref={ref}>
        {tickets.map((ticket, index) => {
            const qrValue = `نوع التذكرة: ${ticket.ticketType} 
                اسم المركب: ${ticket.boatName}
                اسم المرشد: ${ticket.guideName} 
                الجنسية: ${nationalityTranslations[ticket.nationality]} 
                السعر: ${ticket.ticketPrice * ticket.ticketCount} ${currencyNames[ticket.ticketcurrency]}
                المجموع الكلي : ${total}
                تاريخ الطباعة: ${new Date().toLocaleString('ar-EG', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            `;
            const encodedQRValue = utf8.encode(qrValue);

            return (
                <div key={index} style={{ textAlign: "center", margin: "10px 0" }}>
                    <QRCode value={encodedQRValue} />
                    <Typography variant="subtitle1">نوع التذكرة: {ticket.ticketType}</Typography>
                    <Typography variant="subtitle1">اسم المركب: {ticket.boatName}</Typography>
                    <Typography variant="subtitle1">اسم المرشد: {ticket.guideName}</Typography>
                    <Typography variant="subtitle1">الجنسية: {nationalityTranslations[ticket.nationality]}</Typography>
                    <Typography variant="subtitle1">السعر: {ticket.ticketPrice * ticket.ticketCount} {currencyNames[ticket.ticketcurrency]}</Typography>
                </div>
            );
        })}
        <Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
            المجموع الكلي: {total}
        </Typography>
    </div>
));

export default PrintComponent;
