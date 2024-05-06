import React from 'react'
import Drawer from '../../Components/Drawer';
import TicketsList from './TicketsList';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function All() {
    return (
        <div>
            <Drawer />
            <Box height={70} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <Link to='/AddTicket'>
                    <div>
                        <button className='btn btn-primary add-button'>اضافه تذكره</button>
                    </div>
                </Link>

                <TicketsList />
            </Box>
        </div>
    )
}
