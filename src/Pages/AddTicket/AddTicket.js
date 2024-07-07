import React, { useState } from 'react';
import axios from 'axios';
import Drawer from '../../Components/Drawer';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, OutlinedInput } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function AddTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    taxes: '',
    categoryId: '',
    currencyId: '',
    days: []
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const dayValue = parseInt(value); // Convert value to integer
      setFormData(prevState => {
        if (checked) {
          return { ...prevState, days: [...prevState.days, dayValue] };
        } else {
          return { ...prevState, days: prevState.days.filter(day => day !== dayValue) };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'من فضلك ادخل الاسم';
    if (!formData.price) newErrors.price = ' من فضلك ادخل السعر';
    if (!formData.taxes) newErrors.taxes = 'من فضلك ادخل الضرائب';
    if (!formData.categoryId) newErrors.categoryId = 'من فضلك اختر نوع التذكرة';
    if (!formData.currencyId) newErrors.currencyId = 'من فضلك اختر العملة';
    if (formData.days.length === 0) newErrors.days = 'من فضلك اختر اليوم';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await axios.post('http://org-bay.runasp.net/api/Tickets', formData);
      console.log('Ticket added successfully', response.data);

      if (response.data) {
        localStorage.setItem('alertMessage', 'تم إضافة التذكرة بنجاح');
      }

      navigate('/AllTickets');
    }
    catch (error) {
      console.error('There was an error adding the ticket!', error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className='add-head'>اضف التذاكر</h2>
          <Link to='/AllTickets'>
            <button className='btn btn-primary add-button'>رجوع </button>
          </Link>
        </div>

        <div className='card table-style mb-5' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-stayl">
            <h4>اضف البيانات</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">الاسم</label>
                      <input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control" id="name" />
                      {errors.name && <h6 className="error-log">{errors.name}</h6>}
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label htmlFor="categoryId" className="d-flex">نوع التذكره</label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-control">
                      <option value="">اختر نوع التذكرة</option>
                      <option value='1'>عائلي</option>
                      <option value='2'>خاص</option>
                      <option value='3'>فردي</option>
                    </select>
                    {errors.categoryId && <h6 className="error-log">{errors.categoryId}</h6>}
                  </div>

                  <div className='col-md-6'>
                    <label htmlFor="price" className="d-flex">السعر</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.price && <h6 className="error-log">{errors.price}</h6>}
                  </div>

                  <div className='col-md-3'>
                    <label htmlFor="taxes" className="d-flex">الضرائب</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size='small'
                        id="taxes"
                        name="taxes"
                        value={formData.taxes}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.taxes && <h6 className="error-log">{errors.taxes}</h6>}
                  </div>

                  <div className='col-md-3'>
                    <label htmlFor="currencyId" className="d-flex">العملة</label>
                    <select name="currencyId" value={formData.currencyId} onChange={handleChange} className="form-control">
                      <option value="">اختر العملة</option>
                      <option value='1'>$</option>
                      <option value='2'>€</option>
                      <option value='3'>฿</option>
                      <option value='4'>¥</option>
                    </select>
                    {errors.currencyId && <h6 className="error-log">{errors.currencyId}</h6>}
                  </div>

                  <div className='col-md-12'>
                    <label className="d-flex mt-3">اختر اليوم</label>
                    <div className='col-md-12 d-flex'>
                      <FormGroup className='d-flex col-md-3'>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='1' control={<Checkbox onChange={handleChange} checked={formData.days.includes(1)} />} label="السبت" />
                        </div>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='2' control={<Checkbox onChange={handleChange} checked={formData.days.includes(2)} />} label="الاحد" />
                        </div>
                      </FormGroup>
                      <FormGroup className='d-flex col-md-3'>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='3' control={<Checkbox onChange={handleChange} checked={formData.days.includes(3)} />} label="الاثنين" />
                        </div>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='4' control={<Checkbox onChange={handleChange} checked={formData.days.includes(4)} />} label="الثلاثاء" />
                        </div>
                      </FormGroup>
                      <FormGroup className='d-flex col-md-3'>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='5' control={<Checkbox onChange={handleChange} checked={formData.days.includes(5)} />} label="الاربعاء" />
                        </div>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='6' control={<Checkbox onChange={handleChange} checked={formData.days.includes(6)} />} label="الخميس" />
                        </div>
                      </FormGroup>
                      <FormGroup className='d-flex col-md-3'>
                        <div className='col-md-2'>
                          <FormControlLabel className='d-flex' name='days' value='7' control={<Checkbox onChange={handleChange} checked={formData.days.includes(7)} />} label="الجمعه" />
                        </div>
                      </FormGroup>
                    </div>
                    {errors.days && <h6 className="error-log">{errors.days}</h6>}
                  </div>
                </div>
              </div>
              <button type="submit" style={{ fontSize: "20px" }} className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
