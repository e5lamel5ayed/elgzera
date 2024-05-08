import React from 'react';
import Drawer from '../../Components/Drawer';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const currencies = [

];

export default function AddPlaces() {
  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/AllPlaces'>
          <button className='btn btn-primary add-button'>رجوع </button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            اضف البيانات
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
                      <label for="exampleInputEmail1" className="d-flex">الموقع</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex">اضافه صوره</label>
                      <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>

                </div>

              </div>


              <button type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>

      </Box>
    </div>
  )
}
