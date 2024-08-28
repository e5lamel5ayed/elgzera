import React from 'react';
import Drawer from '../../Components/Drawer';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';

export default function AllCategories() {
    

    return (
        <div>
            <Drawer />
            <Box sx={{ width: "80%" }}>
                <h2 className='table-head'>فئات التذاكر</h2>
                <div>
                    <Link to='/AddCategory'>
                        <button className='btn btn-primary add-button'>أضافه فئة التذكرة</button>
                    </Link>
                </div>
                <CategoryList />
            </Box>
        </div>
    );
}
