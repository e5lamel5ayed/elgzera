import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Drawer from '../../Components/Drawer';
import { Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL, PRODUCTS_CREATE, SALES_CENTERS } from '../../Components/Api';

export default function AddProducts() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: null,
    salesCenterId: '',
  });

  const [salesCenters, setSalesCenters] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchSalesCenters = async () => {
      try {
        const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
        setSalesCenters(response.data);
      } catch (error) {
        console.error('Error fetching sales centers:', error);
      }
    };

    fetchSalesCenters();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'Image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title) newErrors.title = 'من فضلك ادخل الاسم';
    if (!formData.price) newErrors.price = 'من فضلك ادخل السعر';
    if (!formData.salesCenterId) newErrors.salesCenterId = 'من فضلك اختر المكان';
    if (!formData.image) newErrors.image = 'من فضلك ادخل الصورة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Title', formData.title);
      formDataToSend.append('Price', formData.price);
      formDataToSend.append('SalesCenterId', formData.salesCenterId);
      formDataToSend.append('Image', formData.image);

      const response = await axios.post(`${baseURL}/${PRODUCTS_CREATE}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        localStorage.setItem("alertMessage", "تم إضافة المنتج بنجاح");
      }

      navigate("/AllProducts");
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/AllProducts'>
          <button className='btn btn-primary add-button'>رجوع</button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            اضف البيانات
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label htmlFor="title" className="d-flex">الاسم</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                      {errors.title && (
                        <h6 className="error-log">{errors.title}</h6>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label htmlFor="price" className="d-flex">السعر</label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                      {errors.price && (
                        <h6 className="error-log">{errors.price}</h6>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label htmlFor="salesCenterId" className="d-flex">اختيار المكان</label>
                    <TextField
                      id="salesCenterId"
                      select
                      name="salesCenterId"
                      value={formData.salesCenterId}
                      onChange={handleChange}
                      size='small'
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر المكان</option>
                      {salesCenters.map(center => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                    </TextField>
                    {errors.salesCenterId && (
                      <h6 className="error-log">{errors.salesCenterId}</h6>
                    )}
                  </div>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label htmlFor="image" className="d-flex">اضافة صورة</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="Image"
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                      {errors.image && (
                        <h6 className="error-log">{errors.image}</h6>
                      )}
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
  );
}
