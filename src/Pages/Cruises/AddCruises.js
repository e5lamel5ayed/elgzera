import React, { useState } from 'react';
import axios from 'axios';
import Drawer from '../../Components/Drawer';
import { Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCruises() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    statusId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'من فضلك ادخل الاسم';
    if (!formData.statusId) newErrors.statusId = ' من فضلك اختر الحالة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/api/Cruises', formData);
      console.log('Cruise added successfully:', response.data);
      if (response.data) {
        localStorage.setItem('alertMessage', 'تم إضافة المركب بنجاح');
      }

      navigate('/AllCruises');
    }

    catch (error) {
      console.error('Error adding cruise:', error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className='add-head'>المراكب</h2>
          <Link to='/AllCruises'>
            <button className='btn btn-primary add-button'>رجوع</button>
          </Link>
        </div>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            <h3>اضف البيانات</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">الاسم</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-describedby="nameHelp"
                      />
                      {errors.name && <h6 className="error-log">{errors.name}</h6>}
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label htmlFor="statusId" className="d-flex">الحالة</label>
                    <TextField
                      id="statusId"
                      name="statusId"
                      select
                      value={formData.statusId}
                      onChange={handleChange}
                      size='small'
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="1">نشط</option>
                      <option value="2">غير نشط</option>
                    </TextField>
                    {errors.statusId && <h6 className="error-log">{errors.statusId}</h6>}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
