import React from 'react'
import Drawer from '../../../Components/Drawer';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Table from './Table';

export default function TraningBranches() {
    return (
        <div>
            <Drawer />
            <Box height={70} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >الفروع</h2>
                    <Link to='/AddBranches'>
                        <button className='btn btn-primary add-button'>اضافه فرع</button>
                    </Link>
                </div>

                <Table/>
            </Box>
        </div>
    )
}
