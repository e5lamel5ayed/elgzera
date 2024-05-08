import React from 'react';
import Drawer from '../../Components/Drawer';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const currencies = [
  {
   
    label: 'active',
  },
  {
   
    label: 'inactive',
  }
];

export default function AddCruises() {
  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/AllCruises'>
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

                 

        

                 

                  {/* <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex"> السعر </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div> */}


                  {/* <div className='col-md-3'>
                    <label for="exampleInputEmail1" className="d-flex"> الضرائب </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}

                      />
                    </FormControl>
                  </div> */}

                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex">الحاله</label>
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Native select"
                      defaultValue=""
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
