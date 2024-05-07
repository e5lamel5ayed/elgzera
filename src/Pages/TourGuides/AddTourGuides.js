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
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/All'>
          <button className='btn btn-primary add-button'>رجوع </button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex">
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
                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div>
{/* 
                  <div className='col-md-3'>
                    <label for="exampleInputEmail1" className="d-flex"> العمله </label>
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Native select"
                      defaultValue="EUR"
                      size='small'
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div> */}

                  {/* <div className='col-md-12 '>
                  <label for="exampleInputEmail1" className="d-flex mt-3"> اختر اليوم </label>
                  <div className='col-md-12 d-flex'>

                    <FormGroup className='d-flex col-md-3'>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="السبت" />
                      </div>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الاحد" />
                      </div>
                      
                      
                    </FormGroup>
                    <FormGroup className='d-flex col-md-3'>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الاثنين" />
                      </div>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الثلاثاء" />
                      </div>
                      
                      
                    </FormGroup>
                    <FormGroup className='d-flex col-md-3'>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الاربعاء" />
                      </div>                      
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الخميس" />
                      </div>                      
                      
                    </FormGroup>
                    <FormGroup className='d-flex col-md-3'>
                      <div className='col-md-2'>
                      <FormControlLabel className='d-flex' control={<Checkbox />} label="الجمعه" />
                      </div>                      
                                          
                      
                    </FormGroup>
                  </div>
                   
                  </div> */}

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
