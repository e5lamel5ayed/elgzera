import React from 'react'
import Drawer from '../../Components/Drawer';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import CruisesList from './CruisesList';

export default function AllCruises() {

    return (
        <div>
            <Drawer />
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >المراكب </h2>
                    <Link to='/AddCruises'>
                        <button className='btn btn-primary add-button'>اضافه مركب</button>
                    </Link>
                </div>
                <CruisesList />
            </Box>
        </div>
    )
}
