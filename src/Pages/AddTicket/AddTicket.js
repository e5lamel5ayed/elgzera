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

export default function AddTicket() {
  return (
    <div>
      <Drawer />
      {/* <Box height={40} sx={{ direction: "rtl" }} /> */}

      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className='add-head' >اضف التذاكر</h2>
          <Link to='/All'>
            <button className='btn btn-primary add-button'>رجوع </button>
          </Link>
        </div>

        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            <h4>

              اضف البيانات
            </h4>
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
                    <label for="exampleInputEmail1" className="d-flex"> نوع التذكره</label>
                    <select class="form-control">
                      <option>Default select</option>
                    </select>
                  </div>

                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex"> السعر </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div>


                  <div className='col-md-3'>
                    <label for="exampleInputEmail1" className="d-flex"> الضرائب </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div>

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
                  </div>

                  <div className='col-md-12 '>
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

                  </div>

                </div>

              </div>


              <button type="submit" style={{fontSize:"20px"}} className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>

      </Box>
    </div>
  )
}
