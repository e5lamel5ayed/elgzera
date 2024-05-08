import React from 'react'
import Drawer from '../../Components/Drawer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CruisesList from './CruisesList';

export default function AllCruises() {
    return (
        <div>
            <Drawer />
            <Box height={70} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >الرحلات البحرية</h2>
                    <Link to='/AddCruises'>
                        <button className='btn btn-primary add-button'>اضافه رحله</button>
                    </Link>
                </div>

                <CruisesList/>
            </Box>
        </div>
    )
}
