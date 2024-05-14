import React from 'react';
import Drawer from '../../Components/Drawer';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function AddCategory() {
  return (
    <div>
      <Drawer />
      {/* <Box height={65} sx={{ direction: "rtl" }} /> */}
      
      <Box sx={{ width: "80%", direction: "rtl" }}>
      <div>
      <h2 className='add-head' >فئة التذكرة</h2>

        <Link to='/AllCategories'>
          <button className='btn btn-primary add-button'>رجوع </button>
        </Link>
      </div>

        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            <h3>

          أضف فئة التذكرة
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className='container'>
                <div className='row'>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> الاسم</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>

                

                </div>

              </div>


              <button style={{fontSize:"20px"}} type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>

      </Box>
    </div>
  )
}
