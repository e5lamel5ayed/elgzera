import React from 'react';
import Drawer from '../../../Components/Drawer';
import { Box, Button, FormControl, InputLabel, OutlinedInput, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';

// قائمة المدن
const cities = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الفيوم'];

export default function AddTourGuides() {
  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/TraningBranches'>
          <Button variant="contained" className='btn btn-primary add-button' color="primary">رجوع</Button>
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
                    <FormControl fullWidth>
                    <label for="exampleInputEmail1" className="d-flex">المدينه</label>
                      <Select
                      size='small'
                        id="city-select"
                        fullWidth
                        input={<OutlinedInput />}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='col-md-6'>
                  <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> العنوان</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                  <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> الكود البريدي</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                  <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> التليفون</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <FormControl fullWidth>
                    <label for="exampleInputEmail1" className="d-flex">الحاله</label>
                      <Select
                      size='small'
                        id="status-select"
                        fullWidth
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <Button variant="contained" color="primary" className="mt-4">حفظ</Button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  )
}
