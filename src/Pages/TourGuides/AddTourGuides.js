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

export default function AddTourGuides() {
  return (
    <div>
      <Drawer />
      {/* <Box height={65} sx={{ direction: "rtl" }} /> */}

      <Box sx={{ width: "80%", direction: "rtl" }}>

        <div>
        <h2 className='add-head' > المرشدين </h2>

          <Link to='/AllTourGuides'>
            <button className='btn btn-primary add-button'>رجوع </button>
          </Link>
        </div>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            <h3>

            اضف البيانات
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

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> الايميل</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex">الحاله</label>
                    <select class="form-control">
                      <option>Default select</option>

                    </select>
                  </div>

                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex">رقم الهاتف</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                      // startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div>


                  <div className='col-md-3'>
                    <label for="exampleInputEmail1" className="d-flex"> نسبة الربح</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}

                      />
                    </FormControl>
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
