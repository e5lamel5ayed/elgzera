import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PlacesList from './PlacesList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllPlaces() {
    useEffect(() => {
        const alertMessage = localStorage.getItem('alertMessage');
        if (alertMessage) {
            toast.success(alertMessage);
            setTimeout(() => {
                localStorage.removeItem('alertMessage');
            }, 2000);
        }
    }, []);
    return (
        <div>
            <Drawer />
            <ToastContainer />
            <div className='box-container'>
                <Box>
                    <div className='table-head'>
                        <h2>الاماكن</h2>
                        <Link to='/AddPlaces'>
                            <button className='btn btn-primary add-button'>اضافة مكان</button>
                        </Link>
                    </div>
                    <PlacesList />
                </Box>
            </div>
        </div>
    )
}
