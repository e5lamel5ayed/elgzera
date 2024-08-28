import React from 'react'
import Drawer from '../../Components/Drawer';
import TicketsList from './TicketsList';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function All() {

    return (
        <div>
            <Drawer />
            <div style={{ widows: "100%" }}>
                <Box sx={{ width: "80%" }}>
                    <div>
                        <h2 className='table-head' >قائمه التذاكر</h2>
                        <Link to='/AddTicket'>
                            <button className='btn btn-primary add-button '>اضافه تذكره</button>
                        </Link>
                    </div>
                    <TicketsList />
                </Box>
            </div>
        </div>
    )
}
