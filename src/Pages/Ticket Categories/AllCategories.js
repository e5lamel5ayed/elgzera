import React from 'react'
import Drawer from '../../Components/Drawer';
// import TicketsList from './TicketsList';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';

export default function AllCategories() {
    return (
        <div>
            <Drawer />
            <Box height={70} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <div>
                    <Link to='/AddCategory'>
                        <button className='btn btn-primary add-button'>أضافه فئة التذكرة</button>
                    </Link>
                </div>

                {/* <TicketsList /> */}
                <CategoryList/>
            </Box>
        </div>
    )
}
